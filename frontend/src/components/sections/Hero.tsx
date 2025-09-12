import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Train, Zap } from "lucide-react";
import heroImage from "@/assets/hero-railway.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Railway Control</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Maximizing Railway{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Throughput
            </span>{" "}
            with AI-Powered Precision
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            AlgoRail helps Indian Railways optimize train scheduling, reduce congestion, 
            and improve punctuality using MILP, GA, ACO and RL.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/dashboard">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 shadow-glow-primary"
              >
                <Train className="w-5 h-5 mr-2" />
                Launch Dashboard
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="lg" 
              className="text-lg px-8 py-6 text-foreground hover:text-primary"
            >
              <a href="#features" className="flex items-center">
                Learn More
                <ChevronDown className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">92%</div>
              <div className="text-muted-foreground">Average Punctuality</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-success mb-2">-15min</div>
              <div className="text-muted-foreground">Delay Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-warning mb-2">+25%</div>
              <div className="text-muted-foreground">Throughput Increase</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};