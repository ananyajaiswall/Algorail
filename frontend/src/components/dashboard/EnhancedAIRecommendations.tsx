import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Check, 
  Edit3, 
  X, 
  Clock, 
  Route, 
  AlertTriangle,
  TrendingUp,
  Activity,
  Brain
} from "lucide-react";

interface AIRecommendation {
  id: string;
  algorithm: "MILP" | "GA" | "ACO" | "RL";
  confidence: number;
  type: "hold" | "reroute" | "replatform" | "speed";
  title: string;
  description: string;
  impact: string;
  impactValue: string;
  urgency: "high" | "medium" | "low";
  trainId: string;
  eta?: string;
  delay?: number;
}

const mockRecommendations: AIRecommendation[] = [
  {
    id: "rec-1",
    algorithm: "GA",
    confidence: 82,
    type: "hold",
    title: "HOLD Train 59381 at Asangaon",
    description: "Genetic algorithm found alternative path with minimal overall delay",
    impact: "-20%",
    impactValue: "Delay",
    urgency: "high",
    trainId: "59381",
    eta: "12:45",
    delay: 2
  },
  {
    id: "rec-2",
    algorithm: "MILP",
    confidence: 95,
    type: "reroute",
    title: "REROUTE Train 16209 via Platform 3",
    description: "Mathematically optimal solution ensuring safety constraints",
    impact: "+10%",
    impactValue: "Punctuality",
    urgency: "medium",
    trainId: "16209",
    eta: "13:20"
  },
  {
    id: "rec-3",
    algorithm: "ACO",
    confidence: 78,
    type: "speed",
    title: "SPEED ADJUST Train 12951",
    description: "Ant Colony Optimization suggests speed reduction for optimal flow",
    impact: "+5%",
    impactValue: "Throughput",
    urgency: "low",
    trainId: "12951",
    eta: "13:45",
    delay: 4
  }
];

export const EnhancedAIRecommendations = () => {
  const [recommendations, setRecommendations] = useState(mockRecommendations);
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  const getAlgorithmColor = (algorithm: string) => {
    switch (algorithm) {
      case "MILP": return "bg-control-active text-background";
      case "GA": return "bg-rail-express text-background";
      case "ACO": return "bg-rail-local text-background";
      case "RL": return "bg-rail-special text-background";
      default: return "bg-muted text-muted-foreground";
    }
  };

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
      case "high": return "bg-status-critical text-white";
      case "medium": return "bg-status-warning text-background";
      case "low": return "bg-status-online text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-status-online";
    if (confidence >= 70) return "text-status-warning";
    return "text-status-critical";
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
    <Card className="h-fit bg-control-panel border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Brain className="w-5 h-5 text-control-active" />
            <h2 className="text-lg font-semibold text-foreground">AI Algorithm Recommendations</h2>
          </div>
          <Badge variant="secondary" className="bg-control-active/10 text-control-active">
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
                  <div className="space-y-3">
                    {/* Algorithm & Confidence Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge className={getAlgorithmColor(rec.algorithm)}>
                          {rec.algorithm}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${getConfidenceColor(rec.confidence)}`}>
                            {rec.confidence}%
                          </span>
                          <Progress 
                            value={rec.confidence} 
                            className="w-16 h-2"
                          />
                        </div>
                      </div>
                      <Badge className={getUrgencyColor(rec.urgency)}>
                        {rec.urgency}
                      </Badge>
                    </div>

                    {/* Recommendation Content */}
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-control-active/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-control-active" />
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-foreground text-sm">
                          {rec.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {rec.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {rec.impactValue}: {rec.impact}
                          </Badge>
                          {rec.eta && (
                            <span className="text-xs text-muted-foreground">
                              ETA: {rec.eta}
                            </span>
                          )}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-2">
                          <Button
                            size="sm"
                            onClick={() => handleAccept(rec.id)}
                            className="bg-status-online hover:bg-status-online/90 text-white"
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleModify(rec.id)}
                          >
                            Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(rec.id)}
                            className="text-status-critical hover:text-status-critical"
                          >
                            <X className="w-3 h-3 mr-1" />
                            Reject
                          </Button>
                        </div>
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
            <div className="w-16 h-16 bg-status-online/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-status-online" />
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