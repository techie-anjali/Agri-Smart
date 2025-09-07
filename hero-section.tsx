import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-agri py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl animate-fade-in-up">
            AI-Powered <span className="text-primary">Crop Recommendations</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            Maximize your farm profits with intelligent crop suggestions based on soil data, weather patterns, and market trends
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <Button 
              onClick={() => scrollToSection("recommend")}
              size="lg"
              className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              data-testid="cta-recommendations"
            >
              Get Smart Recommendations
            </Button>
            <Button 
              variant="ghost"
              onClick={() => scrollToSection("features")}
              className="text-base font-semibold leading-6 text-foreground hover:text-primary transition-colors"
              data-testid="cta-learn-more"
            >
              Learn more <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10 bg-[url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2'%3e%3cpath d='m0 2 30 0 0 30-30 0z' stroke='%23059669' stroke-opacity='0.05'/%3e%3c/svg%3e)]"></div>
    </section>
  );
}
