import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Brain, 
  Play, 
  Settings, 
  Train, 
  Activity,
  Users,
  AlertTriangle,
  Cpu
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SidebarItem {
  id: string;
  label: string;
  icon: any;
  badge?: string;
  badgeVariant?: "default" | "destructive" | "secondary";
  active?: boolean;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "live-operations",
    label: "Live Operations",
    icon: Activity,
    active: true
  },
  {
    id: "ai-recommendations",
    label: "AI Recommendations Analysis",
    icon: Brain,
    badge: "3",
    badgeVariant: "destructive"
  },
  
  {
    id: "performance",
    label: "Performance",
    icon: BarChart3
  },
  {
    id: "train-management", 
    label: "Train Management",
    icon: Train
  }
];

export const ControlSidebar = () => {
  const [activeItem, setActiveItem] = useState("live-operations");

  return (
    <div className="w-64 h-full bg-gradient-sidebar border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-control-active rounded-lg flex items-center justify-center">
            <Train className="w-5 h-5 text-background" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-control-active">Railway Traffic Control</h2>
            <p className="text-xs text-muted-foreground">Section Controller: Delhi Junction</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`
                p-3 cursor-pointer transition-all duration-200 
                ${activeItem === item.id 
                  ? 'bg-control-active/20 border-control-active shadow-glow-active' 
                  : 'bg-transparent hover:bg-card/50 border-transparent'
                }
              `}
              onClick={() => setActiveItem(item.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 ${
                    activeItem === item.id ? 'text-control-active' : 'text-muted-foreground'
                  }`} />
                  <span className={`text-sm font-medium ${
                    activeItem === item.id ? 'text-control-active' : 'text-foreground'
                  }`}>
                    {item.label}
                  </span>
                </div>
                {item.badge && (
                  <Badge 
                    variant={item.badgeVariant || "default"}
                    className="ml-auto"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* System Status Footer */}
      <div className="p-4 border-t border-border">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">System Status</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-status-online rounded-full animate-pulse-glow"></div>
              <span className="text-status-online font-medium">Online</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">CPU Usage</span>
              <span className="text-foreground">65%</span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-1">
              <div className="bg-control-active h-1 rounded-full w-[65%]"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Memory</span>
              <span className="text-foreground">42%</span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-1">
              <div className="bg-primary h-1 rounded-full w-[42%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};