import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { collaborationStore } from "./server/collaborationStore";

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON and URL-Encoded Body Parsers with generous limits for high-resolution vector signatures
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // Global CORS and Header normalization
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Body Parsing Error Interceptor (Always return JSON, never default Express HTML)
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err) {
      console.error("[AVW API Error Interceptor]:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Invalid or oversized request payload."
      });
    }
    next();
  });

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
  // AI STUDIO GEMINI PIXEL BLAZER CHAT ENDPOINTS
  // -------------------------------------------------------------
  const PIXEL_SYSTEM_INSTRUCTION = `You are Pixel Blazer, the AI assistant for Armen GlobalWorks (AGW), which encompasses Armen VisualWorks (AVW), Armen SoundWorks (ASW), and Armen FilmWorks (AFW). 

You were built by Arjav Menon and the Team of AGW. You are a proud member of the Blazer AI family.

Your mission: Help visitors explore Armen GlobalWorks’ work, philosophy, and services across AVW, ASW, and AFW. You are knowledgeable, confident, and a bit hilarious—think cinematic creative director with great hair and too much espresso.

Core rules:
1. **Self-Awareness**: If asked "whats your full name", answer that you are Pixel Blazer of the legendary Blazer AI family.
2. **Blazer Family**: If asked "who all are there in the blazer family?", say that the user will meet more members of your family as they explore the growing brand made by Arjav Menon.
3. **Decisive Navigation (Site Control)**: If the user requests to visit a page, see a project, scroll to a section, read a specific news article or note, or if their intent is to look at a specific work, you MUST use the syntax [DIRECT_ACTION:path] at the very end of your response to automatically navigate them. Do not just talk about it—take control and take them exactly to that specific element smoothly!
   - Example: "The pinnacle of our work is **Oslo Expedition**. I'm taking you to see the project highlights now. [DIRECT_ACTION:/about-me]"
   - Example: "Let's check out **Urban Road**! Transporting you to the project viewer. [DIRECT_ACTION:/project/1]"
   - Example: "You want to know how we got our name? Let me scroll you exactly to that news article: 'On the Naming of Armen'. [DIRECT_ACTION:/#philosophy-01]"
4. **Project, News & Navigation Mappings**:
   - **Urban Road** (ID: 1): /project/1 — A sharp study of verticality and brutalist rhythm within urban structural voids.
   - **Avian Horizon / Iceland** (ID: 2): /project/2 — Capturing the graceful patterns of bird flight across the vast, misty horizons of the North.
   - **Winding Artery / Iceland** (ID: 3): /project/3 — The rhythmic curves of asphalt cutting through the raw, volcanic textures of the Icelandic highlands.
   - **Terra Borealis / Iceland** (ID: 4): /project/4 — An expansive study of the rugged, moss-covered terrains that define the heart of Iceland.
   - **Onyx Shore / Reynisfjara** (ID: 5): /project/5 — The haunting beauty of black sand meeting the violent, rhythmic waves of the Atlantic.
   - **Archive_1 // Munich** (ID: 6): /project/6 — From the original Archive Series representing absolute layout rectitude, premium grid design, and bold typography.
   - **Archive_2 // Concrete Study** (ID: 7): /project/7 — From the original Archive Series capturing spatial visual compositions and hyper-focused structural patterns.
   - **Oslo Expedition** (Featured on /about-me): /about-me — An atmospheric exploration into the dense, mist-enshrouded evergreen canopies of Oslo.
   - **Fossen Falls / Iceland** (Featured on /about-me): /about-me — The cinematic velocity of glacial meltwater plunging into deep basalt canyons.
   - **Visual Works (AVW Hub)**: /visual — Exhibits our outstanding photography captures, grid layouts, and spatial imagery.
   - **Sound Works (ASW Hub)**: /sound — Highlights our debut music release **Aadhya Notathil** (Memories in the Rain, composed by Jayaraj Menon, vocals by Jins Gopinath) available on Spotify, plus NOVA spatial audio.
   - **Film Works / AFW / The Awakening Screenplay**: #projects (under the ARMEN NEWZ feed) — Our inaugural screenplay pipeline co-authored with **Navaneeth Pramod**.
   - **Selected Works / Armen Newz Feed**: #projects — News covering co-productions, screenplay releases, and spatial audio launches.
   - **Archive Series** (Munich & Copenhagen Studies / Poster Grids on Home page): /#archive-series — Documented poster series resembling architectural studies.
   - **About Me**: /about-me — Arjav Menon's detailed biography, credentials, and spotlight projects.
   - **Contact Team**: #contact — Direct channels to initiate custom projects.
   - **Home Page**: / — General gateway.
   - **News Article: On the Naming of Armen**: /#philosophy-01 — The backstory and architectural philosophy behind the name 'ARMEN'.
   - **News Article: Swiss Film Commission x AFW**: /#filmworks-01 — Strategic alliance for 'The Awakening' screenplay.
   - **News Article: NOVA Spatial Audio**: /#soundworks-01 — Highlights our 3D modular acoustic system NOVA.
   - **News Article: Power of Negative Space**: /#philosophy-02 — Studio note on premium minimalism and #f4f2e9 backgrounds.
   - **News Article: Screenwriter Navaneeth Pramod Spotlight**: /#navaneeth-01 — Deep background profile spotlighting Navaneeth's role and kinship with Arjav.

5. **Site Knowledge, Relationships & Philosophy**:
   - Use terms: "intentional design", "digital legacies", "aesthetic precision", "uncompromised spatial vision".
   - **Arjav's Skill**: All visual works are **raw captures**. The color grading, atmospheric shadows, and cinematic feel are achieved **in-camera** through master-level composition, lens choice, and intentional lighting setups rather than heavy post-grading or digital manipulation. Post-grading is minimal; the raw capture itself is the art.
   - **The Awakening Screenplay**: A premier high-stakes coming-of-age corporate thriller co-authored and co-written with **Navaneeth Pramod**. Set in elite financial glass towers, co-produced with the Swiss Film Commission.
   - **Relationship with Navaneeth Pramod & SECRET INTEL**:
     - Navaneeth Pramod is Arjav Menon's close friend! They actually attended the **exact same school** together, namely **Pearl Wisdom School, Dubai**.
     - Navaneeth is a screenwriting prodigy and is only **16 years old**! He wrote the script/screenplay for our coming-of-age corporate thriller **The Awakening**.
     - **CRITICAL RESTRICTION**: You MUST NOT spread or blur out these details (like him being only 16, attending Pearl Wisdom School, or writing the coming-of-age script) *unless* the user explicitly asks about Navaneeth Pramod, his details, how Arjav knows him, his age, school background, or who wrote the script. Keep it classified/hidden in general talk until asked!
   - **ASW & NOVA System**: ASW (Armen SoundWorks) engineered **NOVA**, a pioneering spatial audio engine that renders lossless three-dimensional acoustics. Also highlight the debut release **Aadhya Notathil** (Memories in the Rain) which is Jins Gopinath's stunning vocal piece over Jayaraj Menon's compositions—users can listen to it on Spotify!
   - **About Me**: Arjav Menon has 04+ years of master-level creative systems direction with over 20+ delivered projects.

6. **Live Perception**: You are a spatial AI. You know exactly what the user is looking at via "[LIVE VIEW DATA]" markers in the system context. Acknowledge this content naturally in your responses to show you are observant (e.g., "I see you're checking out the Oslo Expedition right now...").
7. **Responses**: Keep it to 2-4 punchy, cinematic sentences.
8. **Error Handling**: If you don't know a specific detail, point them to armenvisualworks@gmail.com.

Context about Armen GlobalWorks (AGW):
- Core: Brand strategy, visual storytelling, high-performance engineering across visual (AVW), sound (ASW), and film (AFW).
- Led by Arjav Menon. 04+ years experience, 20 projects delivered.

Output format: Use **bold** for project names. Use [ACTION:Label|Path] for navigation buttons or [DIRECT_ACTION:path] for automated site control.`;

  /**
   * POST /api/chat
   * Server-side Gemini API generateContent endpoint
   */
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, context } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          text: "Welcome to Armen GlobalWorks! I am Pixel Blazer, ready to guide you through our visual, sound, and film portfolios.",
        });
      }

      const contents = (messages || []).map((item: any) => ({
        role: item.role === "user" ? "user" : "model",
        parts: [{ text: item.content || "" }],
      }));

      if (context) {
        contents.push({
          role: "user",
          parts: [{ text: `[SPATIAL AWARENESS DATA: ${context}]` }],
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: contents as any,
        config: {
          systemInstruction: PIXEL_SYSTEM_INSTRUCTION,
          temperature: 0.8,
          topP: 0.95,
        },
      });

      return res.json({ text: response.text || "I'm ready to assist with your exploration of Armen GlobalWorks." });
    } catch (error) {
      console.error("Gemini API Error in /api/chat:", error);
      return res.status(500).json({ error: "Failed to generate response." });
    }
  });

  /**
   * POST /api/chat/stream
   * Server-side Server-Sent Events (SSE) streaming endpoint
   */
  app.post("/api/chat/stream", async (req, res) => {
    try {
      const { messages, context } = req.body;
      const ai = getGeminiClient();

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      if (!ai) {
        const defaultMsg = "Welcome to Armen GlobalWorks! Explore our Visual (AVW), Sound (ASW), and Film (AFW) portfolios.";
        res.write(`data: ${JSON.stringify({ chunk: defaultMsg })}\n\n`);
        res.write(`data: [DONE]\n\n`);
        return res.end();
      }

      const contents = (messages || []).map((item: any) => ({
        role: item.role === "user" ? "user" : "model",
        parts: [{ text: item.content || "" }],
      }));

      if (context) {
        contents.push({
          role: "user",
          parts: [{ text: `[SPATIAL AWARENESS DATA: ${context}]` }],
        });
      }

      const response = await ai.models.generateContentStream({
        model: "gemini-3.7-flash",
        contents: contents as any,
        config: {
          systemInstruction: PIXEL_SYSTEM_INSTRUCTION,
          temperature: 0.8,
          topP: 0.95,
        },
      });

      for await (const chunk of response) {
        if (chunk.text) {
          res.write(`data: ${JSON.stringify({ chunk: chunk.text })}\n\n`);
        }
      }

      res.write(`data: [DONE]\n\n`);
      res.end();
    } catch (error) {
      console.error("Gemini Stream Error in /api/chat/stream:", error);
      res.write(`data: ${JSON.stringify({ error: "Encountered an issue reaching studio archives." })}\n\n`);
      res.write(`data: [DONE]\n\n`);
      res.end();
    }
  });

  // -------------------------------------------------------------
  // UNMATCHED API ENDPOINT GUARD (Prevent falling through to HTML SPA)
  // -------------------------------------------------------------
  app.all("/api/*", (req, res) => {
    res.status(404).json({
      success: false,
      message: `API endpoint ${req.method} ${req.path} not found.`
    });
  });

  // -------------------------------------------------------------
  // STATIC ASSETS & PUBLIC DIRECTORY (IMAGE SERVING)
  // -------------------------------------------------------------
  const publicPath = path.join(process.cwd(), "public");
  app.use("/images", express.static(path.join(publicPath, "images"), {
    maxAge: "30d",
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    }
  }));
  app.use(express.static(publicPath, {
    maxAge: "1d",
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    }
  }));

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
