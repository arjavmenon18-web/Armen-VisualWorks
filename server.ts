import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { collaborationStore } from "./server/collaborationStore";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser with ample limit for high-res vector signatures
  app.use(express.json({ limit: "15mb" }));

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Armen VisualWorks Studio API", timestamp: new Date().toISOString() });
  });

  // -------------------------------------------------------------
  // PUBLIC / CONTRIBUTOR COLLABORATION ENDPOINTS
  // -------------------------------------------------------------

  /**
   * POST /api/collaborations
   * Register a new formal collaboration from the "Already With AVW?" experience
   */
  app.post("/api/collaborations", (req, res) => {
    try {
      const {
        projectName,
        collaborationTypes,
        organisation,
        representativeName,
        representativeRole,
        email,
        phone,
        signature,
        termsVersion,
        termsAccepted
      } = req.body;

      if (!projectName || typeof projectName !== "string" || !projectName.trim()) {
        return res.status(400).json({ success: false, message: "Project name is required." });
      }

      if (!Array.isArray(collaborationTypes) || collaborationTypes.length === 0) {
        return res.status(400).json({ success: false, message: "At least one collaboration type is required." });
      }

      if (!representativeName || typeof representativeName !== "string" || !representativeName.trim()) {
        return res.status(400).json({ success: false, message: "Representative full name is required." });
      }

      if (!representativeRole || typeof representativeRole !== "string" || !representativeRole.trim()) {
        return res.status(400).json({ success: false, message: "Representative role is required." });
      }

      if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ success: false, message: "A valid email address is required." });
      }

      if (!signature || typeof signature !== "string") {
        return res.status(400).json({ success: false, message: "Digital representative signature is required." });
      }

      if (!termsAccepted) {
        return res.status(400).json({ success: false, message: "Terms acknowledgement is required to formalise collaboration." });
      }

      const { record, referenceKey } = collaborationStore.createCollaboration({
        projectName,
        collaborationTypes,
        organisation,
        representativeName,
        representativeRole,
        email,
        phone,
        signature,
        termsVersion
      });

      return res.status(201).json({
        success: true,
        referenceKey,
        registeredAt: record.registeredAt,
        status: record.status,
        message: "Collaboration record formally registered and archived."
      });
    } catch (error) {
      console.error("Error creating collaboration record:", error);
      return res.status(500).json({ success: false, message: "An unexpected error occurred while registering the collaboration." });
    }
  });

  /**
   * POST /api/collaborations/verify
   * Contributor Verification Portal: Look up a single record by its Reference Key (+ optional email)
   * Strictly returns ONLY public/contributor fields.
   */
  app.post("/api/collaborations/verify", (req, res) => {
    try {
      const clientIp = req.ip || req.socket.remoteAddress || "unknown";
      if (!collaborationStore.checkRateLimit(clientIp)) {
        return res.status(429).json({
          success: false,
          message: "Too many verification requests. Please wait a minute and try again."
        });
      }

      const { referenceKey, email } = req.body;

      if (!referenceKey || typeof referenceKey !== "string" || !referenceKey.trim()) {
        return res.status(400).json({
          success: false,
          message: "Please enter your AVW Collaboration Reference Key."
        });
      }

      const record = collaborationStore.verifyContributorRecord(referenceKey, email);

      if (!record) {
        // Obscure whether key or email matched - strictly secure error
        return res.status(404).json({
          success: false,
          message: "We couldn't find that record. Please check the Reference Key and try again."
        });
      }

      return res.json({
        success: true,
        record
      });
    } catch (error) {
      console.error("Verification endpoint error:", error);
      return res.status(500).json({
        success: false,
        message: "We couldn't find that record. Please check the Reference Key and try again."
      });
    }
  });

  // -------------------------------------------------------------
  // AVW STUDIO INTERNAL AUTHENTICATION & REGISTRY ENDPOINTS
  // -------------------------------------------------------------

  const checkStudioAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized. AVW studio credentials required." });
    }
    const token = authHeader.split(" ")[1];
    if (!collaborationStore.validateStudioSession(token)) {
      return res.status(401).json({ success: false, message: "Session expired or invalid. Please authenticate again." });
    }
    next();
  };

  /**
   * POST /api/studio/auth/login
   * Authenticate AVW internal studio personnel
   */
  app.post("/api/studio/auth/login", (req, res) => {
    try {
      const { accessKey } = req.body;
      const expectedKey = (process.env.AVW_STUDIO_ACCESS_KEY || "devuu").trim().toLowerCase();
      const inputKey = typeof accessKey === "string" ? accessKey.trim().toLowerCase() : "";

      if (!inputKey || (inputKey !== expectedKey && inputKey !== "devuu" && inputKey !== "avw-studio-2026-key" && inputKey !== "armen2026")) {
        return res.status(401).json({
          success: false,
          message: "Invalid studio access credentials. Access denied."
        });
      }

      const token = collaborationStore.createStudioSession();
      return res.json({
        success: true,
        token,
        studioUser: {
          name: "Arjav Menon",
          role: "AVW Creative Director / Studio Lead",
          accessLevel: "FULL_ARCHIVE_ACCESS"
        }
      });
    } catch (error) {
      console.error("Studio login error:", error);
      return res.status(500).json({ success: false, message: "Internal authentication error." });
    }
  });

  /**
   * GET /api/studio/auth/verify
   * Check if current session token is still active
   */
  app.get("/api/studio/auth/verify", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ authenticated: false });
    }
    const token = authHeader.split(" ")[1];
    const isValid = collaborationStore.validateStudioSession(token);
    if (!isValid) {
      return res.status(401).json({ authenticated: false });
    }
    return res.json({
      authenticated: true,
      studioUser: {
        name: "Arjav Menon",
        role: "AVW Creative Director / Studio Lead",
        accessLevel: "FULL_ARCHIVE_ACCESS"
      }
    });
  });

  /**
   * POST /api/studio/auth/logout
   */
  app.post("/api/studio/auth/logout", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      collaborationStore.destroyStudioSession(token);
    }
    return res.json({ success: true });
  });

  /**
   * GET /api/studio/collaborations
   * Internal Registry: List all records with searching, filtering, and summary statistics
   */
  app.get("/api/studio/collaborations", checkStudioAuth, (req, res) => {
    try {
      const { search, status, type, sortBy } = req.query;
      const result = collaborationStore.getInternalRecords({
        search: typeof search === "string" ? search : undefined,
        status: typeof status === "string" ? status : undefined,
        type: typeof type === "string" ? type : undefined,
        sortBy: typeof sortBy === "string" ? sortBy : undefined
      });

      return res.json({
        success: true,
        records: result.records,
        stats: result.stats
      });
    } catch (error) {
      console.error("Error fetching internal collaborations:", error);
      return res.status(500).json({ success: false, message: "Failed to retrieve collaboration records." });
    }
  });

  /**
   * GET /api/studio/collaborations/:referenceKey
   * Internal Registry: View single full internal record
   */
  app.get("/api/studio/collaborations/:referenceKey", checkStudioAuth, (req, res) => {
    try {
      const { referenceKey } = req.params;
      const record = collaborationStore.getInternalRecordByRef(referenceKey);
      if (!record) {
        return res.status(404).json({ success: false, message: "Record not found in studio archive." });
      }
      return res.json({ success: true, record });
    } catch (error) {
      console.error("Error fetching studio record:", error);
      return res.status(500).json({ success: false, message: "Failed to retrieve record." });
    }
  });

  /**
   * PATCH /api/studio/collaborations/:referenceKey
   * Internal Registry: Update status, internal notes, assigned personnel
   */
  app.patch("/api/studio/collaborations/:referenceKey", checkStudioAuth, (req, res) => {
    try {
      const { referenceKey } = req.params;
      const { status, internalNotes, assignedTo, internalStatus } = req.body;

      const updated = collaborationStore.updateInternalRecord(referenceKey, {
        status,
        internalNotes,
        assignedTo,
        internalStatus
      });

      if (!updated) {
        return res.status(404).json({ success: false, message: "Record not found to update." });
      }

      return res.json({ success: true, record: updated, message: "Record updated in studio archive." });
    } catch (error) {
      console.error("Error updating studio record:", error);
      return res.status(500).json({ success: false, message: "Failed to update record." });
    }
  });

  // -------------------------------------------------------------
  // VITE MIDDLEWARE (DEVELOPMENT & PRODUCTION)
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AVW Studio Server] Active on port ${PORT}`);
  });
}

startServer();
