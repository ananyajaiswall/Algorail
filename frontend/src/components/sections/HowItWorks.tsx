import { motion } from "framer-motion";
import { Database, Cpu, Monitor, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: Database,
    title: "Data Ingestion",
    description: "Real-time collection and processing of railway operational data from multiple sources including timetables, signaling systems, weather, and rolling stock information.",
    details: [
      "Timetable integration",
      "Signal status monitoring", 
      "Weather data feeds",
      "Rolling stock tracking"
    ]
  },
  {
    icon: Cpu,
    title: "AI Optimization",
    description: "Sequential application of MILP, GA, ACO, and RL algorithms to generate optimal scheduling decisions and recommendations.",
    details: [
      "MILP baseline optimization",
      "GA global exploration", 
      "ACO route refinement",
      "RL adaptive learning"
    ]
  },
  {
    icon: Monitor,
    title: "Controller Decision & Monitoring",
    description: "Present actionable recommendations to railway controllers with real-time monitoring and continuous system learning from operator decisions.",
    details: [
      "Interactive recommendations",
      "Safety validation",
      "Real-time monitoring", 
      "Decision feedback loop"
    ]
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A streamlined three-step process that transforms raw railway data into intelligent operational decisions
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold z-10">
                  {index + 1}
                </div>

                <Card className="p-6 h-full bg-card/50 border-border/50 hover:bg-card/70 transition-colors relative">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {step.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Key Components:</h4>
                    <ul className="space-y-1">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow connector */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-primary/5 border-primary/20">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Continuous Optimization Cycle
              </h3>
              <p className="text-muted-foreground mb-6">
                AlgoRail operates in a continuous cycle, constantly learning and adapting to improve railway operations
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Collect Data</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
                    <span className="text-sm font-bold text-success">2</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Optimize</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-2">
                    <span className="text-sm font-bold text-warning">3</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Recommend</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-2">
                    <span className="text-sm font-bold text-destructive">4</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Learn & Adapt</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};