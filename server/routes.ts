import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { analyzeAllCertificates, extractCertificateInfo } from "./image-analyzer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', message: 'Service is healthy' });
  });

  // Certificate Analysis API - analyze all certificates
  app.get('/api/certificates/analyze', async (_req: Request, res: Response) => {
    try {
      const results = await analyzeAllCertificates();
      res.status(200).json({ success: true, data: results });
    } catch (error) {
      console.error('Error analyzing certificates:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while analyzing certificates.' 
      });
    }
  });

  // Certificate Analysis API - analyze a single certificate
  app.get('/api/certificates/analyze/:filename', async (req: Request, res: Response) => {
    try {
      const filename = req.params.filename;
      const filepath = `public/images/conferences/${filename}`;
      
      const certificateInfo = await extractCertificateInfo(filepath);
      res.status(200).json({ success: true, data: certificateInfo });
    } catch (error) {
      console.error('Error analyzing certificate:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while analyzing the certificate.' 
      });
    }
  });

  // Contact form submission
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Validate form data
      const contactSchema = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        subject: z.string().min(2),
        message: z.string().min(10)
      });

      const validData = contactSchema.parse(req.body);
      
      // In a real app, you would store this in a database or send an email
      // For now, just respond with success
      res.status(200).json({ success: true, message: 'Message received' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: 'Invalid form data', 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: 'Server error processing your request' 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
