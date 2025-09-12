import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Features } from "@/components/sections/Features";
import { Algorithms } from "@/components/sections/Algorithms";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CTAPreview } from "@/components/sections/CTAPreview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Hero />
        <Problem />
        <Features />
        <Algorithms />
        <HowItWorks />
        <CTAPreview />
      </main>
    </div>
  );
};

export default Index;