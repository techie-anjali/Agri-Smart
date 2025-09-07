import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import RecommendationForm from "@/components/recommendation-form";
import DashboardSection from "@/components/dashboard-section";
import TechnologySection from "@/components/technology-section";
import Footer from "@/components/footer";
import ChatSupport from "@/components/chat-support";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <RecommendationForm />
        <DashboardSection />
        <TechnologySection />
      </main>
      <Footer />
      <ChatSupport />
    </div>
  );
}
