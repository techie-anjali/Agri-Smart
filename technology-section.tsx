import { Card, CardContent } from "@/components/ui/card";

const technologies = [
  {
    icon: "🤖",
    name: "Machine Learning",
    description: "Advanced AI algorithms"
  },
  {
    icon: "🛰",
    name: "Satellite Data",
    description: "Real-time monitoring"
  },
  {
    icon: "📊",
    name: "Big Data Analytics",
    description: "Massive data processing"
  },
  {
    icon: "☁️",
    name: "Cloud Computing",
    description: "Scalable infrastructure"
  }
];

export default function TechnologySection() {
  return (
    <section id="technology" className="py-24 sm:py-32 bg-gradient-tech">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Powered by Advanced Technology
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Our platform leverages cutting-edge AI and modern technologies to deliver precise agricultural insights
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {technologies.map((tech, index) => (
              <div key={index} className="text-center group" data-testid={`tech-item-${index}`}>
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">{tech.icon}</span>
                </div>
                <h3 className="mt-3 text-sm font-medium text-card-foreground" data-testid={`tech-name-${index}`}>
                  {tech.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground" data-testid={`tech-description-${index}`}>
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
