import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  AlertTriangle, 
  Clock, 
  Train, 
  Activity,
  CheckCircle,
  X 
} from "lucide-react";

interface Notification {
  id: string;
  type: "critical" | "warning" | "info" | "success";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "critical",
    title: "High priority conflict detected",
    message: "at Junction-A",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    read: false
  },
  {
    id: "n2", 
    type: "warning",
    title: "T002 Local running 5 minutes late",
    message: "Platform assignment may need adjustment",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false
  },
  {
    id: "n3",
    type: "info",
    title: "Track section maintenance",
    message: "Scheduled for Platform 3 at 15:30",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    read: true
  },
  {
    id: "n4",
    type: "success",
    title: "AI recommendation accepted",
    message: "Train T001 successfully rerouted",
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    read: true
  }
];

export const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "critical": return AlertTriangle;
      case "warning": return Clock;
      case "info": return Activity;
      case "success": return CheckCircle;
      default: return Train;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "critical": return "text-status-critical";
      case "warning": return "text-status-warning";
      case "info": return "text-control-active";
      case "success": return "text-status-online";
      default: return "text-muted-foreground";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / (1000 * 60));
    if (minutes < 1) return "now";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  };

  return (
    <Card className="h-full bg-control-panel border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
          <Badge 
            variant="destructive" 
            className="bg-status-critical text-status-critical-foreground"
          >
            {unreadCount}
          </Badge>
        </div>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="p-4 space-y-3">
          <AnimatePresence>
            {notifications.map((notification, index) => {
              const Icon = getNotificationIcon(notification.type);
              
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    relative p-3 rounded-lg border transition-all cursor-pointer
                    ${notification.read 
                      ? 'bg-card/30 border-border/50' 
                      : 'bg-card/80 border-control-active/30 shadow-glow-active'
                    }
                  `}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className={`w-4 h-4 mt-0.5 ${getNotificationColor(notification.type)}`} />
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium ${
                          notification.read ? 'text-muted-foreground' : 'text-foreground'
                        }`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dismissNotification(notification.id);
                            }}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className={`text-xs ${
                        notification.read ? 'text-muted-foreground' : 'text-muted-foreground'
                      }`}>
                        {notification.message}
                      </p>
                    </div>
                  </div>

                  {!notification.read && (
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-control-active rounded-full"></div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {notifications.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-status-online mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">All Clear!</h3>
              <p className="text-sm text-muted-foreground">
                No active notifications at the moment.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};