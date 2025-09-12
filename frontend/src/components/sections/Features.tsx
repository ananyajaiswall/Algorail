import { motion } from "framer-motion";
import { 
  Database, 
  Brain, 
  GitBranch, 
  Eye, 
  BarChart3, 
  Shield,
  Zap,
  Clock
} from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Database,
    title: "Real-time Data Integration",
    description: "Seamlessly integrate timetables, signaling systems, rolling stock data, and weather conditions for comprehensive operational awareness.",
    color: "text-primary"
  },
  {
    icon: Brain,
    title: "AI-Powered Scheduling",
    description: "Advanced algorithms automatically generate optimal schedules and provide intelligent recommendations for dynamic situations.",
    color: "text-success"
  },
  {
    icon: GitBranch,
    title: "What-if Simulation Engine",
    description: "Test alternate routing scenarios and evaluate their impact before implementation, ensuring optimal decision-making.",
    color: "text-warning"
  },
  {
    icon: Eye,
    title: "Explainable AI & Audit Trails",
    description: "Full transparency in AI decisions with detailed explanations and comprehensive audit logs for compliance and analysis.",
    color: "text-destructive"
  },
  {
    icon: BarChart3,
    title: "KPI Dashboards",
    description: "Real-time monitoring of punctuality, throughput, and track utilization with actionable insights and trends.",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Safety Validation",
    description: "Built-in safety checks ensure all recommendations comply with railway safety protocols and regulations.",
    color: "text-success"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Key Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive AI-powered railway management capabilities designed for modern transportation networks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full bg-card/50 border-border/50 hover:bg-card/70 transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-${feature.color.split('-')[1]}/10 flex items-center justify-center`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Integration Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-primary/5 border-primary/20">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Zap className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">
                  Real-time Integration
                </h3>
              </div>
              <p className="text-muted-foreground mb-6">
                AlgoRail processes data from multiple sources in real-time to provide comprehensive operational intelligence
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium text-foreground">Timetables</div>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-success mx-auto mb-2" />
                  <div className="text-sm font-medium text-foreground">Signaling</div>
                </div>
                <div className="text-center">
                  <Database className="w-8 h-8 text-warning mx-auto mb-2" />
                  <div className="text-sm font-medium text-foreground">Rolling Stock</div>
                </div>
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 text-destructive mx-auto mb-2" />
                  <div className="text-sm font-medium text-foreground">Weather</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};