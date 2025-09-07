import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: "🌱",
    title: "Smart Crop Selection",
    description: "AI analyzes soil composition, weather patterns, and market data to recommend the most profitable crops for your specific location and conditions."
  },
  {
    icon: "🌤",
    title: "Weather Forecasting",
    description: "Advanced weather predictions help you plan planting, irrigation, and harvesting schedules for optimal crop growth and yield."
  },
  {
    icon: "💰",
    title: "Market Price Alerts",
    description: "Real-time market prices and trend analysis help you sell at the right time and avoid middlemen for maximum profit."
  },
  {
    icon: "🔬",
    title: "Disease Detection",
    description: "Computer vision technology identifies crop diseases early, providing treatment recommendations to protect your investment."
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Revolutionary Farming Solutions
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Empower your agricultural decisions with cutting-edge AI technology designed for modern farming
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="group relative rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                data-testid={`feature-card-${index}`}
              >
                <CardContent className="p-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl">
                    <span>{feature.icon}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
