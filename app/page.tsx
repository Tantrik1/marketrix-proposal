import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import AboutSection from "@/components/sections/AboutSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TechStack from "@/components/sections/TechStack";
import WorkWithYou from "@/components/sections/WorkWithYou";
import ProcessSection from "@/components/sections/ProcessSection";
import PricingEstimator from "@/components/sections/PricingEstimator";
import PortfolioSection from "@/components/sections/PortfolioSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <FeaturesSection />
      <TechStack />
      <WorkWithYou />
      <PricingEstimator />
      <ProcessSection />
      <PortfolioSection />
      <FinalCTA />
    </>
  );
}
