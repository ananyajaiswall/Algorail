import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Activity, Clock, TrendingUp, Gauge, Power, Wifi } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const EnhancedHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus] = useState("online");

  // Live clock update
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const kpis = [
    {
      label: "Punctuality",
      value: "87.16774528751989%",
      icon: Clock,
      trend: "+2.3%",
      color: "text-success",
      isGood: true
    },
    {
      label: "Throughput", 
      value: "145",
      icon: TrendingUp,
      trend: "+12",
      color: "text-control-active",
      isGood: true
    },
    {
      label: "Average Delay",
      value: "4.673671462212915 min",
      icon: Activity,
      trend: "+0.8 min",
      color: "text-warning",
      isGood: false
    },
    {
      label: "Track Utilization",
      value: "79.81080202035778%",
      icon: Gauge,
      trend: "+5.2%",
      color: "text-warning",
      isGood: false
    }
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour12: false,
      timeZone: 'Asia/Kolkata'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    });
  };

  return (
    <div className="w-full bg-control-panel border-b border-border">
      {/* System Alert Strip */}
      <div className="bg-status-critical/10 border-b border-status-critical/20 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-status-critical animate-blink" />
            <span className="text-sm font-medium text-status-critical">
              High priority conflict detected at Junction-A
            </span>
            <Badge variant="destructive" className="text-xs">
              14:18
            </Badge>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            className="border-status-critical text-status-critical hover:bg-status-critical hover:text-white"
          >
            EMERGENCY STOP
          </Button>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-6">
          {/* Left: Title and Location */}
          <div>
            <h1 className="text-2xl font-bold text-foreground">Railway Traffic Control</h1>
            <div className="flex items-center space-x-4 mt-1">
              <p className="text-sm text-muted-foreground">Section Controller: Delhi Junction</p>
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4 text-status-online" />
                <Badge 
                  className={`
                    ${systemStatus === 'online' 
                      ? 'bg-status-online text-status-online-foreground' 
                      : 'bg-status-critical text-status-critical-foreground'
                    }
                  `}
                >
                  System {systemStatus === 'online' ? 'Online' : 'Offline'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Right: Live Clock */}
          <div className="text-right">
            <div className="text-2xl font-mono font-bold text-control-active">
              {formatTime(currentTime)} IST
            </div>
            <div className="text-sm text-muted-foreground">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>

        {/* KPI Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 bg-card/80 border-border/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      {kpi.label}
                    </p>
                    <p className="text-lg font-bold text-foreground mt-1 leading-tight">
                      {kpi.value}
                    </p>
                    <div className="flex items-center mt-1">
                      <span 
                        className={`text-xs ${
                          kpi.isGood ? 'text-success' : 'text-warning'
                        }`}
                      >
                        {kpi.trend}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};