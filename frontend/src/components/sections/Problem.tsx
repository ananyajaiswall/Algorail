import { motion } from "framer-motion";
import { AlertTriangle, Clock, Shuffle, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const problems = [
  {
    icon: AlertTriangle,
    title: "Rising congestion and delays",
    description: "Manual control systems limit operational efficiency and response times",
    color: "text-destructive"
  },
  {
    icon: Shuffle,
    title: "Mixed traffic complexity",
    description: "Express, suburban, and freight trains sharing scarce track infrastructure",
    color: "text-warning"
  },
  {
    icon: Zap,
    title: "Real-time disturbances",
    description: "Dynamic conditions require rapid re-optimization and decision making",
    color: "text-primary"
  }
];

export const Problem = () => {
  return (
    <section id="problem" className="py-20 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Railway Challenge
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Indian Railways faces unprecedented operational challenges that require intelligent solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="p-6 h-full bg-card/50 border-border/50 hover:bg-card/70 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-${problem.color.split('-')[1]}/10 flex items-center justify-center`}>
                    <problem.icon className={`w-6 h-6 ${problem.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {problem.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-destructive mb-1">68%</div>
              <div className="text-sm text-muted-foreground">Trains Face Delays</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-warning mb-1">12min</div>
              <div className="text-sm text-muted-foreground">Average Delay</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">₹2.5k Cr</div>
              <div className="text-sm text-muted-foreground">Annual Revenue Loss</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-muted-foreground mb-1">Manual</div>
              <div className="text-sm text-muted-foreground">Control Systems</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};