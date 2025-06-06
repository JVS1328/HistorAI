import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generatePortraitSchema } from "@shared/schema";
import { generateHistoricalPortrait } from "./openai";
import multer from "multer";
import sharp from "sharp";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate historical portrait endpoint
  app.post("/api/generate-portrait", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      // Validate request body
      const validationResult = generatePortraitSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid request data",
          details: validationResult.error.errors 
        });
      }

      const { yearWar, side, rank, branch, extraDetails, artStyle } = validationResult.data;

      // Process and optimize the image
      let processedImageBuffer: Buffer;
      try {
        processedImageBuffer = await sharp(req.file.buffer)
          .resize(1024, 1024, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .jpeg({ quality: 85 })
          .toBuffer();
      } catch (error) {
        return res.status(400).json({ error: "Invalid or corrupted image file" });
      }

      // Convert to base64
      const imageBase64 = processedImageBuffer.toString('base64');

      // Generate the portrait using OpenAI
      const result = await generateHistoricalPortrait({
        imageBase64,
        yearWar,
        side,
        rank,
        branch,
        extraDetails,
        artStyle,
      });

      // Store the portrait record
      const portrait = await storage.createPortrait({
        originalImageUrl: `data:image/jpeg;base64,${imageBase64}`,
        generatedImageUrl: result.url,
        yearWar,
        side,
        rank,
        branch,
        extraDetails: extraDetails || null,
        artStyle,
      });

      res.json({ 
        success: true,
        portraitId: portrait.id,
        imageUrl: result.url
      });

    } catch (error) {
      console.error('Portrait generation error:', error);
      
      if (error instanceof Error && error.message.includes('OpenAI')) {
        res.status(500).json({ 
          error: "Failed to generate portrait. Please try again later.",
          details: error.message
        });
      } else {
        res.status(500).json({ 
          error: "Internal server error occurred during portrait generation" 
        });
      }
    }
  });

  // Get portrait by ID
  app.get("/api/portraits/:id", async (req, res) => {
    try {
      const portraitId = parseInt(req.params.id);
      if (isNaN(portraitId)) {
        return res.status(400).json({ error: "Invalid portrait ID" });
      }

      const portrait = await storage.getPortrait(portraitId);
      if (!portrait) {
        return res.status(404).json({ error: "Portrait not found" });
      }

      res.json(portrait);
    } catch (error) {
      console.error('Get portrait error:', error);
      res.status(500).json({ error: "Failed to retrieve portrait" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
