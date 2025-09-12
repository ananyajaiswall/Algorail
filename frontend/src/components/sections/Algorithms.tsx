import { motion } from "framer-motion";
import { Cpu, Network, Shuffle, Brain } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const algorithms = [
  {
    icon: Cpu,
    name: "MILP",
    fullName: "Mixed Integer Linear Programming",
    description: "Baseline exact optimizer that provides mathematically optimal solutions for train scheduling problems with proven convergence guarantees.",
    advantages: ["Exact solutions", "Proven optimality", "Constraint handling"],
    color: "text-primary"
  },
  {
    icon: Network,
    name: "GA",
    fullName: "Genetic Algorithm",
    description: "Global schedule exploration using evolutionary computation to discover innovative scheduling patterns across large solution spaces.",
    advantages: ["Global optimization", "Parallel exploration", "Scalable"],
    color: "text-success"
  },
  {
    icon: Shuffle,
    name: "ACO",
    fullName: "Ant Colony Optimization",
    description: "Sequential path and crossing refinement that mimics ant foraging behavior to optimize route selections and junction management.",
    advantages: ["Dynamic adaptation", "Distributed solving", "Route optimization"],
    color: "text-warning"
  },
  {
    icon: Brain,
    name: "RL",
    fullName: "Reinforcement Learning",
    description: "Adaptive real-time decision policies that learn from operational experience to continuously improve scheduling performance.",
    advantages: ["Real-time adaptation", "Experience learning", "Continuous improvement"],
    color: "text-destructive"
  }
];

export const Algorithms = () => {
  return (
    <section id="algorithms" className="py-20 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Algorithms at the Core
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sophisticated optimization algorithms working in harmony to deliver intelligent railway scheduling solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {algorithms.map((algorithm, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="p-6 h-full bg-card/50 border-border/50 hover:bg-card/70 transition-colors">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-${algorithm.color.split('-')[1]}/10 flex items-center justify-center`}>
                    <algorithm.icon className={`w-8 h-8 ${algorithm.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-2xl font-bold text-foreground">
                        {algorithm.name}
                      </h3>
                      <Badge variant="outline" className={`${algorithm.color} border-current`}>
                        Core Algorithm
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {algorithm.fullName}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  {algorithm.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">Key Advantages:</h4>
                  <div className="flex flex-wrap gap-2">
                    {algorithm.advantages.map((advantage, advIndex) => (
                      <Badge 
                        key={advIndex} 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {advantage}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Algorithm Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-primary/5 border-primary/20">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Integrated Algorithm Pipeline
              </h3>
              <p className="text-muted-foreground">
                Our algorithms work sequentially and in parallel to optimize different aspects of railway operations
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
              {algorithms.map((algorithm, index) => (
                <div key={index} className="flex items-center">
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-lg bg-${algorithm.color.split('-')[1]}/10 flex items-center justify-center mx-auto mb-2`}>
                      <algorithm.icon className={`w-6 h-6 ${algorithm.color}`} />
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {algorithm.name}
                    </div>
                  </div>
                  {index < algorithms.length - 1 && (
                    <div className="hidden md:block w-8 h-px bg-border mx-4"></div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};