import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCropRecommendationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Crop recommendations endpoint
  app.post("/api/recommendations", async (req, res) => {
    try {
      const validatedData = insertCropRecommendationSchema.parse(req.body);
      const recommendation = await storage.createCropRecommendation(validatedData);
      res.json(recommendation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Get weather data
  app.get("/api/weather/:location?", async (req, res) => {
    try {
      const location = req.params.location || "Default";
      const weather = await storage.getWeatherData(location);
      
      if (!weather) {
        res.status(404).json({ message: "Weather data not found" });
        return;
      }
      
      res.json(weather);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get market prices
  app.get("/api/market-prices", async (req, res) => {
    try {
      const prices = await storage.getMarketPrices();
      res.json(prices);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get crop recommendations by location
  app.get("/api/recommendations/:location", async (req, res) => {
    try {
      const location = req.params.location;
      const recommendations = await storage.getCropRecommendationsByLocation(location);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
