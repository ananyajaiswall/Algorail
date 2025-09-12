import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Hand, 
  Unlock, 
  AlertTriangle, 
  Train,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  icon: any;
  variant: "default" | "destructive" | "warning" | "success";
  description: string;
  requiresConfirmation?: boolean;
}

const quickActions: QuickAction[] = [
  {
    id: "hold-train",
    label: "Hold Selected Train",
    icon: Hand,
    variant: "warning",
    description: "Stop the currently selected train at next station",
    requiresConfirmation: true
  },
  {
    id: "release-track",
    label: "Release Track Section",
    icon: Unlock,
    variant: "success", 
    description: "Clear track section for normal operations"
  },
  {
    id: "override-signal",
    label: "Override Signal",
    icon: AlertTriangle,
    variant: "destructive",
    description: "Manual signal override - use with caution",
    requiresConfirmation: true
  },
  {
    id: "emergency-route",
    label: "Emergency Routing",
    icon: RotateCcw,
    variant: "destructive",
    description: "Activate emergency routing protocols",
    requiresConfirmation: true
  }
];

export const QuickActions = () => {
  const [selectedTrain] = useState("T001");
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const handleAction = (actionId: string, requiresConfirmation: boolean) => {
    if (requiresConfirmation && !pendingAction) {
      setPendingAction(actionId);
      // Auto-clear confirmation after 5 seconds
      setTimeout(() => setPendingAction(null), 5000);
      return;
    }

    // Execute action
    console.log(`Executing action: ${actionId}`);
    setPendingAction(null);
    
    // Here you would typically call an API or update state
    // For now, we'll just simulate the action
  };

  const getButtonVariant = (action: QuickAction) => {
    if (pendingAction === action.id) return "destructive";
    switch (action.variant) {
      case "destructive": return "destructive";
      case "warning": return "outline";
      case "success": return "outline";
      default: return "outline";
    }
  };

  const getButtonText = (action: QuickAction) => {
    if (pendingAction === action.id) {
      return "Click to Confirm";
    }
    return action.label;
  };

  return (
    <Card className="bg-control-panel border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
          <Badge variant="outline" className="text-control-active border-control-active">
            Train {selectedTrain} Selected
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-border transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`
                  p-2 rounded-lg
                  ${action.variant === 'destructive' ? 'bg-status-critical/20 text-status-critical' :
                    action.variant === 'warning' ? 'bg-status-warning/20 text-status-warning' :
                    action.variant === 'success' ? 'bg-status-online/20 text-status-online' :
                    'bg-control-active/20 text-control-active'
                  }
                `}>
                  <action.icon className="w-4 h-4" />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    {action.label}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>

              <Button
                size="sm"
                variant={getButtonVariant(action)}
                onClick={() => handleAction(action.id, action.requiresConfirmation || false)}
                className={`
                  min-w-[120px] transition-all
                  ${pendingAction === action.id ? 'animate-pulse-glow' : ''}
                `}
              >
                {getButtonText(action)}
              </Button>
            </div>
          </motion.div>
        ))}

        {pendingAction && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 bg-status-critical/10 border border-status-critical/20 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-status-critical" />
              <span className="text-sm text-status-critical font-medium">
                Confirmation required - Click the button again to execute
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
};