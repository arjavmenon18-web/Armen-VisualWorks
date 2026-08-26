export type CollaborationStatus = "active" | "completed" | "archived";

export interface ContributorCollaborationRecord {
  referenceKey: string;
  projectName: string;
  collaborationTypes: string[];
  organisation?: string;
  representativeName: string;
  representativeRole: string;
  email: string;
  phone?: string;
  termsVersion: string;
  termsAccepted: boolean;
  termsAcceptedAt: string;
  signature: string; // Base64 data URL
  status: CollaborationStatus;
  registeredAt: string;
  recordCreatedAt?: string;
  signatureCapturedAt?: string;
  referenceGeneratedAt?: string;
}

export interface CollaborationRecord {
  collaborationId: string;
  createdAt: string;
  termsVersion: string;
  termsAccepted: boolean;
  projectName: string;
  collaborationTypes: string[];
  organisation?: string;
  representativeName: string;
  representativeRole: string;
  email: string;
  phone?: string;
  signature: string;
  status: string;
  recordCreatedAt?: string;
  signatureCapturedAt?: string;
  referenceGeneratedAt?: string;
}

export interface StudioCollaborationRecord extends ContributorCollaborationRecord {
  id: string; // Internal database ID (never exposed to contributor)
  createdAt: string;
  updatedAt: string;
  internalNotes?: string;
  assignedTo?: string;
  internalStatus?: string;
}

export interface CollaborationSummaryStats {
  total: number;
  active: number;
  completed: number;
  archived: number;
  recentCount: number;
}

export type CollaborationCategory = "FILM" | "MUSIC" | "BRAND" | "CREATIVE";

export interface CollaborationTypeOption {
  id: string;
  label: string;
  category: CollaborationCategory;
}

export const COLLABORATION_TYPES: CollaborationTypeOption[] = [
  // FILM
  { id: "film-promotion", label: "Film Promotion", category: "FILM" },
  { id: "film-key-art", label: "Film Key Art", category: "FILM" },
  { id: "film-campaign", label: "Film Campaign", category: "FILM" },
  { id: "character-promotion", label: "Character Promotion", category: "FILM" },
  { id: "other-film-creative", label: "Other Film Creative", category: "FILM" },

  // MUSIC
  { id: "label-promotion", label: "Label Promotion", category: "MUSIC" },
  { id: "artist-album-creative", label: "Artist / Album Creative", category: "MUSIC" },
  { id: "music-campaign", label: "Music Campaign", category: "MUSIC" },

  // BRAND
  { id: "brand-promotion", label: "Brand Promotion", category: "BRAND" },
  { id: "advertising", label: "Advertising", category: "BRAND" },
  { id: "product-campaign", label: "Product Campaign", category: "BRAND" },
  { id: "brand-identity", label: "Brand Identity", category: "BRAND" },

  // CREATIVE
  { id: "creative-direction", label: "Creative Direction", category: "CREATIVE" },
  { id: "visual-design", label: "Visual Design", category: "CREATIVE" },
  { id: "other-collaboration", label: "Other Collaboration", category: "CREATIVE" },
];

export const TERMS_VERSION = "AVW-COLLAB-1.0";

export const TERMS_SLIDES_DATA = [
  {
    number: "01",
    total: "07",
    category: "CREATIVE PARTNERSHIP",
    title: "We Create With You.",
    body: "AVW approaches collaborations as creative partnerships rather than conventional agency-client transactions. We want to understand the project, the people behind it and what you're trying to achieve so we can contribute meaningfully—not simply deliver a brief.",
    closing: "We don't just work for projects. We work with the people behind them."
  },
  {
    number: "02",
    total: "07",
    category: "COMMUNICATION",
    title: "Talk To Us.",
    body: "Budgets change. Timelines move. Ideas evolve. If something becomes difficult, the direction isn't working, or circumstances change, tell us. If pricing becomes difficult, we'd much rather have an honest conversation and explore another route than lose communication.",
    closing: "Conversation comes before cancellation."
  },
  {
    number: "03",
    total: "07",
    category: "AVW RECOGNITION",
    title: "Let People Know Who Made It.",
    body: "AVW puts genuine creative thought into the work we create. Unless otherwise agreed, appropriate AVW attribution should remain with publicly released work. Where applicable, the official AVW presence should be tagged or credited. If a particular platform, print format, theatrical use or commercial requirement makes attribution impractical, simply discuss it with us beforehand. We are reasonable.",
    closing: null
  },
  {
    number: "04",
    total: "07",
    category: "WATERMARK & ATTRIBUTION",
    title: "Our Mark Stays With The Work.",
    body: "Where an AVW watermark or signature is included in an approved creative, it should remain visible, intact and reasonably legible. It should not be intentionally cropped, removed, covered, obscured, or altered without prior agreement. If a clean version is required for a legitimate theatrical, broadcast, print, advertising or commercial use, the requirement can be discussed with AVW beforehand.",
    closing: "The AVW watermark identifies our creative contribution. It does not claim ownership of the client's film, brand or underlying intellectual property."
  },
  {
    number: "05",
    total: "07",
    category: "SCOPE & DELIVERABLES",
    title: "Let's Keep Things Clear.",
    body: "Every collaboration has an agreed scope. That may include number of deliverables, formats, revisions, timeline, and creative requirements. We are happy to accommodate reasonable changes. If the project grows beyond what was originally agreed, we'll discuss the change before proceeding.",
    closing: "No surprise bills. No silent scope changes."
  },
  {
    number: "06",
    total: "07",
    category: "FLEXIBLE PRICING",
    title: "Budgets Are Real.",
    body: "AVW packages are starting frameworks rather than rigid rules. Project complexity, timeline, deliverables and available budget can all influence the final arrangement. If something doesn't fit financially, tell us. Where appropriate, AVW may adjust the scope, package or approach to find something workable.",
    closing: null
  },
  {
    number: "07",
    total: "07",
    category: "LONG-TERM RELATIONSHIP",
    title: "More Than A Transaction.",
    body: "AVW values long-term creative relationships. We want to understand the people and projects we work with and build relationships that can continue beyond one deliverable. If we're working together, we're invested in making the collaboration stronger.",
    closing: "We don't simply want to complete a project. We want to create something worth being part of."
  }
];

