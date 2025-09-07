import { 
  type User, 
  type InsertUser, 
  type CropRecommendation, 
  type InsertCropRecommendation,
  type WeatherData,
  type InsertWeatherData,
  type MarketPrice,
  type InsertMarketPrice
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createCropRecommendation(data: InsertCropRecommendation): Promise<CropRecommendation>;
  getCropRecommendationsByLocation(location: string): Promise<CropRecommendation[]>;
  
  getWeatherData(location: string): Promise<WeatherData | undefined>;
  createWeatherData(data: InsertWeatherData): Promise<WeatherData>;
  
  getMarketPrices(): Promise<MarketPrice[]>;
  createMarketPrice(data: InsertMarketPrice): Promise<MarketPrice>;
  updateMarketPrice(crop: string, price: number, change: number): Promise<MarketPrice | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private cropRecommendations: Map<string, CropRecommendation>;
  private weatherData: Map<string, WeatherData>;
  private marketPrices: Map<string, MarketPrice>;

  constructor() {
    this.users = new Map();
    this.cropRecommendations = new Map();
    this.weatherData = new Map();
    this.marketPrices = new Map();
    
    // Initialize with sample market data
    this.initializeMarketData();
    this.initializeWeatherData();
  }

  private initializeMarketData() {
    const samplePrices = [
      { crop: "Wheat", price: "2150", unit: "qtl", change: "2.5" },
      { crop: "Rice", price: "1980", unit: "qtl", change: "-1.2" },
      { crop: "Cotton", price: "6800", unit: "qtl", change: "4.1" },
      { crop: "Barley", price: "1850", unit: "qtl", change: "0.8" },
      { crop: "Mustard", price: "5200", unit: "qtl", change: "1.5" }
    ];

    samplePrices.forEach(price => {
      const id = randomUUID();
      const marketPrice: MarketPrice = {
        id,
        crop: price.crop,
        price: price.price,
        unit: price.unit,
        change: price.change
      };
      this.marketPrices.set(id, marketPrice);
    });
  }

  private initializeWeatherData() {
    const sampleWeather: WeatherData = {
      id: randomUUID(),
      location: "Default",
      temperature: 28,
      condition: "Sunny",
      forecast: [
        { day: "Today", temperature: 28, condition: "Sunny" },
        { day: "Tomorrow", temperature: 26, condition: "Cloudy" },
        { day: "Day 3", temperature: 24, condition: "Rain" }
      ]
    };
    this.weatherData.set("Default", sampleWeather);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createCropRecommendation(data: InsertCropRecommendation): Promise<CropRecommendation> {
    const id = randomUUID();
    const recommendations = this.generateCropRecommendations(data);
    const cropRecommendation: CropRecommendation = {
      ...data,
      id,
      recommendations
    };
    this.cropRecommendations.set(id, cropRecommendation);
    return cropRecommendation;
  }

  async getCropRecommendationsByLocation(location: string): Promise<CropRecommendation[]> {
    return Array.from(this.cropRecommendations.values()).filter(
      rec => rec.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  async getWeatherData(location: string): Promise<WeatherData | undefined> {
    return this.weatherData.get(location) || this.weatherData.get("Default");
  }

  async createWeatherData(data: InsertWeatherData): Promise<WeatherData> {
    const id = randomUUID();
    const weatherData: WeatherData = { ...data, id };
    this.weatherData.set(data.location, weatherData);
    return weatherData;
  }

  async getMarketPrices(): Promise<MarketPrice[]> {
    return Array.from(this.marketPrices.values());
  }

  async createMarketPrice(data: InsertMarketPrice): Promise<MarketPrice> {
    const id = randomUUID();
    const marketPrice: MarketPrice = { ...data, id };
    this.marketPrices.set(id, marketPrice);
    return marketPrice;
  }

  async updateMarketPrice(crop: string, price: number, change: number): Promise<MarketPrice | undefined> {
    const existingPrice = Array.from(this.marketPrices.values()).find(p => p.crop === crop);
    if (existingPrice) {
      existingPrice.price = price.toString();
      existingPrice.change = change.toString();
      this.marketPrices.set(existingPrice.id, existingPrice);
      return existingPrice;
    }
    return undefined;
  }

  private generateCropRecommendations(data: InsertCropRecommendation) {
    const cropDatabase = {
      clay: {
        spring: [
          { name: 'Rice', profitScore: 92, expectedYield: '45 quintals/acre', profitMargin: '₹25,000/acre' },
          { name: 'Wheat', profitScore: 88, expectedYield: '42 quintals/acre', profitMargin: '₹22,000/acre' }
        ],
        summer: [
          { name: 'Cotton', profitScore: 85, expectedYield: '20 quintals/acre', profitMargin: '₹35,000/acre' },
          { name: 'Sugarcane', profitScore: 82, expectedYield: '80 tonnes/acre', profitMargin: '₹45,000/acre' }
        ],
        monsoon: [
          { name: 'Rice', profitScore: 95, expectedYield: '48 quintals/acre', profitMargin: '₹28,000/acre' },
          { name: 'Maize', profitScore: 88, expectedYield: '40 quintals/acre', profitMargin: '₹20,000/acre' }
        ],
        winter: [
          { name: 'Wheat', profitScore: 90, expectedYield: '45 quintals/acre', profitMargin: '₹25,000/acre' },
          { name: 'Barley', profitScore: 82, expectedYield: '38 quintals/acre', profitMargin: '₹20,000/acre' }
        ]
      },
      loamy: {
        spring: [
          { name: 'Wheat', profitScore: 94, expectedYield: '50 quintals/acre', profitMargin: '₹28,000/acre' },
          { name: 'Barley', profitScore: 87, expectedYield: '42 quintals/acre', profitMargin: '₹22,000/acre' }
        ],
        summer: [
          { name: 'Tomato', profitScore: 95, expectedYield: '60 quintals/acre', profitMargin: '₹50,000/acre' },
          { name: 'Chilli', profitScore: 89, expectedYield: '25 quintals/acre', profitMargin: '₹40,000/acre' }
        ],
        monsoon: [
          { name: 'Maize', profitScore: 90, expectedYield: '45 quintals/acre', profitMargin: '₹25,000/acre' },
          { name: 'Soybean', profitScore: 93, expectedYield: '28 quintals/acre', profitMargin: '₹30,000/acre' }
        ],
        winter: [
          { name: 'Potato', profitScore: 91, expectedYield: '200 quintals/acre', profitMargin: '₹35,000/acre' },
          { name: 'Peas', profitScore: 87, expectedYield: '20 quintals/acre', profitMargin: '₹25,000/acre' }
        ]
      },
      sandy: {
        spring: [
          { name: 'Groundnut', profitScore: 92, expectedYield: '25 quintals/acre', profitMargin: '₹30,000/acre' },
          { name: 'Millet', profitScore: 88, expectedYield: '15 quintals/acre', profitMargin: '₹18,000/acre' }
        ],
        summer: [
          { name: 'Watermelon', profitScore: 85, expectedYield: '300 quintals/acre', profitMargin: '₹40,000/acre' },
          { name: 'Sesame', profitScore: 89, expectedYield: '8 quintals/acre', profitMargin: '₹20,000/acre' }
        ],
        monsoon: [
          { name: 'Sorghum', profitScore: 85, expectedYield: '25 quintals/acre', profitMargin: '₹20,000/acre' },
          { name: 'Groundnut', profitScore: 92, expectedYield: '28 quintals/acre', profitMargin: '₹32,000/acre' }
        ],
        winter: [
          { name: 'Cumin', profitScore: 90, expectedYield: '6 quintals/acre', profitMargin: '₹35,000/acre' },
          { name: 'Fennel', profitScore: 87, expectedYield: '8 quintals/acre', profitMargin: '₹30,000/acre' }
        ]
      },
      silt: {
        spring: [
          { name: 'Rice', profitScore: 89, expectedYield: '42 quintals/acre', profitMargin: '₹24,000/acre' },
          { name: 'Wheat', profitScore: 91, expectedYield: '46 quintals/acre', profitMargin: '₹26,000/acre' }
        ],
        summer: [
          { name: 'Cucumber', profitScore: 82, expectedYield: '150 quintals/acre', profitMargin: '₹25,000/acre' },
          { name: 'Okra', profitScore: 86, expectedYield: '80 quintals/acre', profitMargin: '₹30,000/acre' }
        ],
        monsoon: [
          { name: 'Rice', profitScore: 93, expectedYield: '47 quintals/acre', profitMargin: '₹27,000/acre' },
          { name: 'Jute', profitScore: 78, expectedYield: '25 quintals/acre', profitMargin: '₹15,000/acre' }
        ],
        winter: [
          { name: 'Mustard', profitScore: 84, expectedYield: '18 quintals/acre', profitMargin: '₹22,000/acre' },
          { name: 'Lentil', profitScore: 88, expectedYield: '12 quintals/acre', profitMargin: '₹25,000/acre' }
        ]
      }
    };

    const soilCrops = cropDatabase[data.soilType as keyof typeof cropDatabase];
    if (soilCrops) {
      const seasonCrops = soilCrops[data.season as keyof typeof soilCrops];
      if (seasonCrops) {
        return seasonCrops.slice(0, 3); // Return top 3 recommendations
      }
    }

    // Default recommendations
    return [
      { name: 'Mixed Farming', profitScore: 80, expectedYield: 'Variable', profitMargin: '₹20,000/acre' },
      { name: 'Consultation Needed', profitScore: 75, expectedYield: 'Contact Expert', profitMargin: 'Variable' }
    ];
  }
}

export const storage = new MemStorage();
