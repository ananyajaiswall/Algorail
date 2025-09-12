import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Train, 
  Clock, 
  Activity, 
  TrendingUp, 
  Gauge,
  AlertTriangle,
  ExternalLink
} from "lucide-react";

export const CTAPreview = () => {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Experience AlgoRail Live
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See real-time railway optimization in action with our interactive dashboard
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-8 bg-gradient-primary/5 border-primary/20 shadow-glow-primary/20">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Train className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    AlgoRail — Live Section Snapshot
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Mumbai Central - Kasara Section
                  </p>
                </div>
              </div>
              <Badge className="bg-success/10 text-success border-success/20">
                Live Data
              </Badge>
            </div>

            {/* Alert */}
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-6">
              <div className="flex items-center space-x-2 text-warning">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Prediction (15 mins): High congestion expected near Kasara Yard.
                </span>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 rounded-lg bg-card/50">
                <Clock className="w-6 h-6 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">92%</div>
                <div className="text-xs text-muted-foreground">Punctuality</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card/50">
                <Activity className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">4 mins</div>
                <div className="text-xs text-muted-foreground">Avg Delay</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card/50">
                <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">12 Trains/Hr</div>
                <div className="text-xs text-muted-foreground">Section Throughput</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card/50">
                <Gauge className="w-6 h-6 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">78%</div>
                <div className="text-xs text-muted-foreground">Track Utilization</div>
              </div>
            </div>

            {/* AI Recommendation Preview */}
            <div className="bg-card/50 border border-border rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground text-sm mb-1">
                    HOLD Train 59381 at Asangaon
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    To allow priority train 12137 Punjab Mail to overtake. This prevents cascading 15 min delay.
                  </p>
                  <Badge variant="outline" className="text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Section Punctuality: +2%
                  </Badge>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 shadow-glow-primary"
                >
                  <Train className="w-5 h-5 mr-2" />
                  Launch Dashboard
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-3">
                Explore the full interactive dashboard with real-time network schematic and AI recommendations
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Railway Sections</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-success mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-warning mb-1">10M+</div>
              <div className="text-sm text-muted-foreground">Data Points/Day</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-destructive mb-1">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};