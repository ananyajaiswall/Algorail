import { motion } from "framer-motion";
import { AlertTriangle, Activity, Clock, TrendingUp, Gauge } from "lucide-react";
import { Card } from "@/components/ui/card";

export const DashboardHeader = () => {
  const kpis = [
    {
      label: "Punctuality",
      value: "92%",
      icon: Clock,
      trend: "+2%",
      color: "text-success"
    },
    {
      label: "Avg Delay",
      value: "4 mins",
      icon: Activity,
      trend: "-1m",
      color: "text-primary"
    },
    {
      label: "Section Throughput",
      value: "12 Trains/Hr",
      icon: TrendingUp,
      trend: "+3",
      color: "text-success"
    },
    {
      label: "Track Utilization",
      value: "78%",
      icon: Gauge,
      trend: "+5%",
      color: "text-warning"
    }
  ];

  return (
    <div className="w-full border-b border-border bg-card">
      {/* Alert Strip */}
      <div className="bg-warning/10 border-b border-warning/20 px-6 py-3">
        <div className="flex items-center space-x-2 text-warning">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-medium">
            PREDICTION (15 MINS): High congestion expected near Kasara Yard.
          </span>
        </div>
      </div>

      {/* KPI Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mumbai Central - Kasara Section</h1>
            <p className="text-sm text-muted-foreground">Zone: Western Railway</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Last Updated: 12:39:15</p>
            <p className="text-sm text-success">Network Health: Good</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 bg-card/50 border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      {kpi.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                    <p className={`text-xs ${kpi.color}`}>{kpi.trend}</p>
                  </div>
                  <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};