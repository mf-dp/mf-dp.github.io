import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { analyzeAllCertificates, extractCertificateInfo } from "./image-analyzer";
import { articleSuggester } from "./article-suggester";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', message: 'Service is healthy' });
  });
  
  // Articles API - get all articles
  app.get('/api/articles', (_req: Request, res: Response) => {
    try {
      const articles = articleSuggester.getAllArticles();
      res.status(200).json({ success: true, data: articles });
    } catch (error) {
      console.error('Error fetching articles:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while fetching articles.' 
      });
    }
  });
  
  // Articles API - search articles by topic
  app.get('/api/articles/search', (req: Request, res: Response) => {
    try {
      const topic = req.query.topic as string;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      
      if (!topic) {
        return res.status(400).json({ 
          success: false, 
          message: 'Topic parameter is required' 
        });
      }
      
      const articles = articleSuggester.findArticlesByTopic(topic, limit);
      res.status(200).json({ success: true, data: articles });
    } catch (error) {
      console.error('Error searching articles:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while searching for articles.' 
      });
    }
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
