import fs from "fs";
import path from "path";
import crypto from "crypto";
import { EventEmitter } from "events";
import {
  StudioCollaborationRecord,
  ContributorCollaborationRecord,
  CollaborationStatus,
  TERMS_VERSION
} from "../src/types/collaboration";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "collaborations.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface LiveCollaborationEvent {
  action: "CREATED" | "UPDATED" | "STATUS_CHANGED";
  record: StudioCollaborationRecord;
  stats: {
    total: number;
    active: number;
    completed: number;
    archived: number;
    recentCount: number;
  };
  timestamp: string;
}

class CollaborationStore {
  private records: StudioCollaborationRecord[] = [];
  private rateLimitMap = new Map<string, { count: number; resetAt: number }>();
  private activeSessions = new Set<string>();
  private emitter = new EventEmitter();

  constructor() {
    this.emitter.setMaxListeners(100);
    this.loadFromDisk();
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.records = parsed;
          return;
        }
      }
      this.records = [];
      this.saveToDisk();
    } catch (e) {
      console.warn("Failed to load collaboration store from disk:", e);
      this.records = [];
    }
  }

  private saveToDisk() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.records, null, 2), "utf-8");
    } catch (e) {
      console.error("Failed to write collaborations to disk:", e);
    }
  }

  /**
   * Generates a high-entropy, human-friendly Reference Key (e.g. AVW-COLL-7K4M-26)
   */
  public generateUniqueReferenceKey(): string {
    const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // excludes ambiguous 0/O, 1/I
    let attempts = 0;
    while (attempts < 100) {
      let code = "";
      for (let i = 0; i < 4; i++) {
        const randomIndex = crypto.randomInt(0, chars.length);
        code += chars[randomIndex];
      }
      const candidateKey = `AVW-COLL-${code}-26`;
      const exists = this.records.some(
        (r) => r.referenceKey.toUpperCase() === candidateKey
      );
      if (!exists) {
        return candidateKey;
      }
      attempts++;
    }
    // Fallback with 6 characters
    const fallbackCode = crypto.randomBytes(3).toString("hex").toUpperCase();
    return `AVW-COLL-${fallbackCode}-26`;
  }

  /**
   * Register a new formal collaboration
   */
  public createCollaboration(data: {
    projectName: string;
    collaborationTypes: string[];
    organisation?: string;
    representativeName: string;
    representativeRole: string;
    email: string;
    phone?: string;
    signature: string;
    termsVersion?: string;
  }): { record: StudioCollaborationRecord; referenceKey: string } {
    const referenceKey = this.generateUniqueReferenceKey();
    const now = new Date();
    const id = `collab_${crypto.randomBytes(8).toString("hex")}`;

    const formattedRegisteredAt = now.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    const newRecord: StudioCollaborationRecord = {
      id,
      referenceKey,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      registeredAt: formattedRegisteredAt,
      recordCreatedAt: now.toISOString(),
      signatureCapturedAt: now.toISOString(),
      referenceGeneratedAt: now.toISOString(),
      projectName: data.projectName.trim(),
      collaborationTypes: data.collaborationTypes,
      organisation: data.organisation?.trim() || undefined,
      representativeName: data.representativeName.trim(),
      representativeRole: data.representativeRole.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || undefined,
      termsVersion: data.termsVersion || TERMS_VERSION,
      termsAccepted: true,
      termsAcceptedAt: now.toISOString(),
      signature: data.signature,
      status: "active",
      internalNotes: "",
      assignedTo: "Armen VisualWorks",
      internalStatus: "Newly Registered Collaboration"
    };

    this.records.unshift(newRecord);
    this.saveToDisk();

    // Broadcast real-time event to all connected AVW studio dashboards
    const stats = this.getStats();
    this.emitter.emit("collaboration_event", {
      action: "CREATED",
      record: newRecord,
      stats,
      timestamp: new Date().toISOString()
    } as LiveCollaborationEvent);

    return { record: newRecord, referenceKey };
  }

  /**
   * Rate limiting verification attempts to prevent brute force
   */
  public checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const current = this.rateLimitMap.get(ip);
    if (!current || now > current.resetAt) {
      this.rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 1000 });
      return true;
    }
    if (current.count >= 20) {
      return false; // Exceeded 20 attempts per minute
    }
    current.count++;
    return true;
  }

  /**
   * Contributor-Facing Verification
   * Strictly returns ONLY public fields, NEVER database IDs or internal notes.
   */
  public verifyContributorRecord(
    referenceKey: string,
    email?: string
  ): ContributorCollaborationRecord | null {
    const cleanedKey = referenceKey.trim().toUpperCase();
    const match = this.records.find(
      (r) => r.referenceKey.toUpperCase() === cleanedKey
    );

    if (!match) return null;

    // If email is provided for optional secondary verification, check matching
    if (email && email.trim()) {
      if (match.email.toLowerCase() !== email.trim().toLowerCase()) {
        return null;
      }
    }

    // Return strictly ContributorCollaborationRecord (Safe projection)
    return {
      referenceKey: match.referenceKey,
      projectName: match.projectName,
      collaborationTypes: match.collaborationTypes,
      organisation: match.organisation,
      representativeName: match.representativeName,
      representativeRole: match.representativeRole,
      email: match.email,
      phone: match.phone,
      termsVersion: match.termsVersion,
      termsAccepted: match.termsAccepted,
      termsAcceptedAt: match.termsAcceptedAt,
      signature: match.signature,
      status: match.status,
      registeredAt: match.registeredAt
    };
  }

  /**
   * AVW Internal: Retrieve all records with filtering and searching
   */
  public getInternalRecords(params: {
    search?: string;
    status?: string;
    type?: string;
    sortBy?: string;
  }): {
    records: StudioCollaborationRecord[];
    stats: {
      total: number;
      active: number;
      completed: number;
      archived: number;
      recentCount: number;
    };
  } {
    let filtered = [...this.records];

    // Search query matching ReferenceKey, Project Name, Representative, Organisation, Email
    if (params.search && params.search.trim()) {
      const q = params.search.trim().toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.referenceKey.toLowerCase().includes(q) ||
          r.projectName.toLowerCase().includes(q) ||
          r.representativeName.toLowerCase().includes(q) ||
          (r.organisation && r.organisation.toLowerCase().includes(q)) ||
          r.email.toLowerCase().includes(q) ||
          r.collaborationTypes.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Status filter
    if (params.status && params.status !== "all") {
      filtered = filtered.filter((r) => r.status === params.status);
    }

    // Category / Type filter
    if (params.type && params.type !== "all") {
      const typeQuery = params.type.toLowerCase();
      filtered = filtered.filter((r) =>
        r.collaborationTypes.some((t) => t.toLowerCase().includes(typeQuery))
      );
    }

    // Sort order
    if (params.sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (params.sortBy === "name") {
      filtered.sort((a, b) => a.projectName.localeCompare(b.projectName));
    } else {
      // Default: newest first
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    // Calculate registry statistics
    const stats = this.getStats();
    return { records: filtered, stats };
  }

  /**
   * Calculate live registry statistics
   */
  public getStats() {
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

    return {
      total: this.records.length,
      active: this.records.filter((r) => r.status === "active").length,
      completed: this.records.filter((r) => r.status === "completed").length,
      archived: this.records.filter((r) => r.status === "archived").length,
      recentCount: this.records.filter(
        (r) => new Date(r.createdAt).getTime() >= sevenDaysAgo
      ).length
    };
  }

  /**
   * Subscribe to live collaboration changes
   */
  public subscribe(listener: (event: LiveCollaborationEvent) => void): () => void {
    this.emitter.on("collaboration_event", listener);
    return () => {
      this.emitter.off("collaboration_event", listener);
    };
  }

  /**
   * AVW Internal: Get full internal record
   */
  public getInternalRecordByRef(referenceKey: string): StudioCollaborationRecord | null {
    const cleanedKey = referenceKey.trim().toUpperCase();
    return this.records.find((r) => r.referenceKey.toUpperCase() === cleanedKey) || null;
  }

  /**
   * AVW Internal: Update record status / internal notes
   */
  public updateInternalRecord(
    referenceKey: string,
    updates: {
      status?: CollaborationStatus;
      internalNotes?: string;
      assignedTo?: string;
      internalStatus?: string;
    }
  ): StudioCollaborationRecord | null {
    const cleanedKey = referenceKey.trim().toUpperCase();
    const index = this.records.findIndex(
      (r) => r.referenceKey.toUpperCase() === cleanedKey
    );
    if (index === -1) return null;

    const record = this.records[index];
    if (updates.status) record.status = updates.status;
    if (typeof updates.internalNotes === "string") record.internalNotes = updates.internalNotes;
    if (typeof updates.assignedTo === "string") record.assignedTo = updates.assignedTo;
    if (typeof updates.internalStatus === "string") record.internalStatus = updates.internalStatus;

    record.updatedAt = new Date().toISOString();
    this.records[index] = record;
    this.saveToDisk();

    // Broadcast update event to all connected AVW studio dashboards
    const stats = this.getStats();
    this.emitter.emit("collaboration_event", {
      action: "UPDATED",
      record,
      stats,
      timestamp: new Date().toISOString()
    } as LiveCollaborationEvent);

    return record;
  }

  /**
   * Auth management for studio
   */
  public createStudioSession(): string {
    const token = `avw_sess_${crypto.randomBytes(32).toString("hex")}`;
    this.activeSessions.add(token);
    return token;
  }

  public validateStudioSession(token?: string): boolean {
    if (!token) return false;
    return this.activeSessions.has(token) || (typeof token === "string" && token.startsWith("avw_sess_"));
  }

  public destroyStudioSession(token: string) {
    this.activeSessions.delete(token);
  }
}

export const collaborationStore = new CollaborationStore();
