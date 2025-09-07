import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { WeatherData, MarketPrice } from "@shared/schema";

export default function DashboardSection() {
  const { data: weather, isLoading: weatherLoading } = useQuery<WeatherData>({
    queryKey: ["/api/weather"],
  });

  const { data: prices, isLoading: pricesLoading } = useQuery<MarketPrice[]>({
    queryKey: ["/api/market-prices"],
  });

  const alerts = [
    { message: "Disease detected in nearby wheat fields", time: "2 hours ago", type: "high" },
    { message: "Fertilizer prices dropped by 8%", time: "1 day ago", type: "medium" },
    { message: "Heavy rainfall warning for next week", time: "3 days ago", type: "high" }
  ];

  return (
    <section id="dashboard" className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Farmer Dashboard
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Stay informed with real-time data, market trends, and personalized insights
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Weather Card */}
            <Card className="rounded-lg border bg-card p-6 shadow-sm" data-testid="weather-card">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-card-foreground">Weather Forecast</h3>
                  <div className="text-2xl">🌤</div>
                </div>
                <div className="mt-4 space-y-3">
                  {weatherLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ) : weather ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Today</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium" data-testid="current-temperature">
                            {weather.temperature}°C
                          </span>
                          <span className="text-xs text-muted-foreground" data-testid="current-condition">
                            {weather.condition}
                          </span>
                        </div>
                      </div>
                      {Array.isArray(weather.forecast) && weather.forecast.map((day: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{day.day}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{day.temperature}°C</span>
                            <span className="text-xs text-muted-foreground">{day.condition}</span>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">Weather data unavailable</p>
                  )}
                </div>
                <div className="mt-4 p-3 bg-primary/10 rounded-md">
                  <p className="text-xs text-primary">
                    💡 Perfect weather for irrigation tomorrow morning
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Market Prices Card */}
            <Card className="rounded-lg border bg-card p-6 shadow-sm" data-testid="market-prices-card">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-card-foreground">Market Prices</h3>
                  <div className="text-2xl">💰</div>
                </div>
                <div className="mt-4 space-y-3">
                  {pricesLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ) : prices && prices.length > 0 ? (
                    prices.slice(0, 3).map((price, index) => (
                      <div key={price.id} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground" data-testid={`price-crop-${index}`}>
                          {price.crop}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${
                            parseFloat(price.change) > 0 ? 'text-primary' : 'text-destructive'
                          }`} data-testid={`price-amount-${index}`}>
                            ₹{price.price}/{price.unit}
                          </span>
                          <span className={`text-xs ${
                            parseFloat(price.change) > 0 ? 'text-primary' : 'text-destructive'
                          }`} data-testid={`price-change-${index}`}>
                            {parseFloat(price.change) > 0 ? '+' : ''}{price.change}%
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Market data unavailable</p>
                  )}
                </div>
                <div className="mt-4 p-3 bg-accent/10 rounded-md">
                  <p className="text-xs text-accent-foreground">
                    📈 Wheat prices trending up - good time to sell!
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Alerts Card */}
            <Card className="rounded-lg border bg-card p-6 shadow-sm" data-testid="alerts-card">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-card-foreground">Alerts & Notifications</h3>
                  <div className="text-2xl">🔔</div>
                </div>
                <div className="mt-4 space-y-3">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`flex h-2 w-2 mt-2 rounded-full ${
                        alert.type === 'high' ? 'bg-destructive' : 'bg-primary'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-xs text-card-foreground" data-testid={`alert-message-${index}`}>
                          {alert.message}
                        </p>
                        <p className="text-xs text-muted-foreground" data-testid={`alert-time-${index}`}>
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors" data-testid="view-all-alerts">
                    View all alerts
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Additional Insights */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card className="rounded-lg border bg-card p-6 shadow-sm" data-testid="soil-health-card">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Soil Health Analytics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">pH Level</span>
                    <span className="text-sm font-medium text-primary" data-testid="ph-level">7.2 (Optimal)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Nitrogen</span>
                    <span className="text-sm font-medium text-accent" data-testid="nitrogen-level">Medium</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Phosphorus</span>
                    <span className="text-sm font-medium text-primary" data-testid="phosphorus-level">High</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Potassium</span>
                    <span className="text-sm font-medium text-primary" data-testid="potassium-level">High</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="rounded-lg border bg-card p-6 shadow-sm" data-testid="yield-predictions-card">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Yield Predictions</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Season</span>
                    <span className="text-sm font-medium text-primary" data-testid="current-season-yield">+15% above average</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Expected Revenue</span>
                    <span className="text-sm font-medium text-primary" data-testid="expected-revenue">₹4,85,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Profit Margin</span>
                    <span className="text-sm font-medium text-primary" data-testid="profit-margin">32%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
