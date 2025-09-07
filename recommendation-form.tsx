import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { CropRecommendation } from "@shared/schema";

const formSchema = z.object({
  location: z.string().min(1, "Location is required"),
  soilType: z.string().min(1, "Soil type is required"),
  season: z.string().min(1, "Season is required"),
  farmSize: z.string().min(1, "Farm size is required"),
  waterAvailability: z.string().min(1, "Water availability is required"),
  budget: z.string().min(1, "Budget range is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function RecommendationForm() {
  const [recommendations, setRecommendations] = useState<CropRecommendation | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      soilType: "",
      season: "",
      farmSize: "",
      waterAvailability: "",
      budget: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/recommendations", data);
      return response.json();
    },
    onSuccess: (data: CropRecommendation) => {
      setRecommendations(data);
      toast({
        title: "Recommendations Generated",
        description: "Your personalized crop recommendations are ready!",
      });
      
      // Scroll to results
      setTimeout(() => {
        const element = document.getElementById("recommendation-results");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <section id="recommend" className="py-24 sm:py-32 bg-gradient-recommendation">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get Your Crop Recommendations
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Provide your farming details to receive personalized AI-powered crop suggestions
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-4xl">
          <Card className="rounded-lg border bg-card shadow-sm p-8">
            <CardContent className="p-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your city or region" 
                              {...field}
                              data-testid="input-location"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="soilType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Soil Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-soil-type">
                                <SelectValue placeholder="Select soil type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="clay">Clay</SelectItem>
                              <SelectItem value="loamy">Loamy</SelectItem>
                              <SelectItem value="sandy">Sandy</SelectItem>
                              <SelectItem value="silt">Silt</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="season"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Season</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-season">
                                <SelectValue placeholder="Select season" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="spring">Spring</SelectItem>
                              <SelectItem value="summer">Summer</SelectItem>
                              <SelectItem value="monsoon">Monsoon</SelectItem>
                              <SelectItem value="winter">Winter</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="farmSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Farm Size (acres)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              placeholder="Enter farm size"
                              step="0.1"
                              min="0.1"
                              {...field}
                              data-testid="input-farm-size"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="waterAvailability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Water Availability</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-water-availability">
                                <SelectValue placeholder="Select water availability" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="abundant">Abundant</SelectItem>
                              <SelectItem value="moderate">Moderate</SelectItem>
                              <SelectItem value="limited">Limited</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget Range</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-budget">
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low (&lt; ₹50,000)</SelectItem>
                              <SelectItem value="medium">Medium (₹50,000 - ₹2,00,000)</SelectItem>
                              <SelectItem value="high">High (&gt; ₹2,00,000)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="text-center pt-6">
                    <Button 
                      type="submit"
                      size="lg"
                      disabled={mutation.isPending}
                      className="rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                      data-testid="button-generate-recommendations"
                    >
                      {mutation.isPending ? "Generating Recommendations..." : "Get AI Recommendations"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          {recommendations && (
            <Card 
              id="recommendation-results" 
              className="mt-8 rounded-lg border bg-gradient-results p-8"
              data-testid="recommendation-results"
            >
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Recommended Crops for Your Farm
                </h3>
                <p className="text-muted-foreground mb-6">
                  Based on your location, soil type, and seasonal conditions, here are our AI-powered recommendations:
                </p>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.isArray(recommendations.recommendations) && recommendations.recommendations.map((crop: any, index: number) => (
                    <Card key={index} className="rounded-lg border bg-card p-4 shadow-sm">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-card-foreground" data-testid={`crop-name-${index}`}>
                            {crop.name}
                          </h4>
                          <span className="text-sm font-medium text-primary" data-testid={`crop-score-${index}`}>
                            {crop.profitScore}% Match
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground" data-testid={`crop-yield-${index}`}>
                          Expected Yield: {crop.expectedYield}
                        </p>
                        <p className="text-sm text-muted-foreground" data-testid={`crop-profit-${index}`}>
                          Profit Margin: {crop.profitMargin}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
