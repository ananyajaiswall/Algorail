import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Edit3, 
  X, 
  Clock, 
  Route, 
  AlertTriangle,
  TrendingUp,
  Activity
} from "lucide-react";

interface Recommendation {
  id: string;
  type: "hold" | "reroute" | "replatform" | "speed";
  title: string;
  description: string;
  impact: string;
  urgency: "high" | "medium" | "low";
  trainId: string;
  eta?: string;
}

const mockRecommendations: Recommendation[] = [
  {
    id: "rec-1",
    type: "hold",
    title: "HOLD Train 59381 at Asangaon",
    description: "To allow priority train 12137 Punjab Mail to overtake. This prevents a cascading 15 min delay across the western corridor.",
    impact: "Section Punctuality: +2%",
    urgency: "high",
    trainId: "59381",
    eta: "12:45"
  },
  {
    id: "rec-2",
    type: "reroute",
    title: "REROUTE Train 16209 via Platform 3",
    description: "Current platform assignment conflicts with incoming express service. Rerouting maintains schedule integrity and reduces passenger wait time.",
    impact: "Platform Efficiency: +8%",
    urgency: "medium",
    trainId: "16209",
    eta: "13:20"
  },
  {
    id: "rec-3",
    type: "speed",
    title: "SPEED ADJUST Train 12951",
    description: "Reduce speed by 15% between Kalyan-Asangaon to optimize slot timing and prevent platform conflicts.",
    impact: "Network Flow: +5%",
    urgency: "low",
    trainId: "12951",
    eta: "13:45"
  }
];

export const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState(mockRecommendations);
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hold": return Clock;
      case "reroute": return Route;
      case "replatform": return Activity;
      case "speed": return TrendingUp;
      default: return AlertTriangle;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleAccept = (id: string) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
    // TODO: Send to API and update audit log
  };

  const handleReject = (id: string) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
    // TODO: Send to API and update audit log
  };

  const handleModify = (id: string) => {
    // TODO: Open modification modal
    console.log("Modify recommendation:", id);
  };

  return (
    <Card className="h-fit bg-card border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">AI Recommendations</h2>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {recommendations.length} Active
          </Badge>
        </div>

        <div className="flex space-x-2">
          <Button
            variant={activeTab === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("active")}
          >
            Active
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("history")}
          >
            History
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
        <AnimatePresence>
          {activeTab === "active" && recommendations.map((rec, index) => {
            const Icon = getTypeIcon(rec.type);
            
            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 bg-card/50 border-border/50 hover:bg-card/70 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground text-sm">
                          {rec.title}
                        </h3>
                        <Badge className={getUrgencyColor(rec.urgency)}>
                          {rec.urgency}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {rec.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {rec.impact}
                        </Badge>
                        {rec.eta && (
                          <span className="text-xs text-muted-foreground">
                            ETA: {rec.eta}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => handleAccept(rec.id)}
                          className="bg-success hover:bg-success/90 text-success-foreground"
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleModify(rec.id)}
                        >
                          <Edit3 className="w-3 h-3 mr-1" />
                          Modify
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(rec.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="w-3 h-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {activeTab === "active" && recommendations.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-success" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">All Clear!</h3>
            <p className="text-sm text-muted-foreground">
              No active recommendations at the moment.
            </p>
          </div>
        )}

        {activeTab === "history" && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">History</h3>
            <p className="text-sm text-muted-foreground">
              Recommendation history will appear here.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};