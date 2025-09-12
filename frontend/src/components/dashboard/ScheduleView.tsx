import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Train, MapPin } from "lucide-react";

interface ScheduleItem {
  trainId: string;
  trainName: string;
  type: "premium" | "express" | "local" | "freight";
  track: string;
  from: string;
  to: string;
  scheduledTime: string;
  actualTime: string;
  status: "on-time" | "delayed" | "early";
  delay: number;
  platform: string;
}

const mockSchedule: ScheduleItem[] = [
  {
    trainId: "12951",
    trainName: "Mumbai Rajdhani",
    type: "premium",
    track: "UP",
    from: "Mumbai Central",
    to: "New Delhi",
    scheduledTime: "12:40",
    actualTime: "12:40",
    status: "on-time",
    delay: 0,
    platform: "2"
  },
  {
    trainId: "12137",
    trainName: "Punjab Mail",
    type: "express",
    track: "UP",
    from: "Mumbai CST",
    to: "Firozpur",
    scheduledTime: "13:12",
    actualTime: "13:20",
    status: "delayed",
    delay: 8,
    platform: "1"
  },
  {
    trainId: "18609",
    trainName: "Loco Pilot Special",
    type: "local",
    track: "DN",
    from: "Kasara",
    to: "Mumbai Central",
    scheduledTime: "12:50",
    actualTime: "12:52",
    status: "delayed",
    delay: 2,
    platform: "S5"
  },
  {
    trainId: "59381",
    trainName: "Freight 59381",
    type: "freight",
    track: "LOOP",
    from: "Kalyan Yard",
    to: "Igatpuri",
    scheduledTime: "14:03",
    actualTime: "14:15",
    status: "delayed",
    delay: 12,
    platform: "LOOP"
  }
];

export const ScheduleView = () => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "premium": return "bg-rail-premium/10 text-rail-premium border-rail-premium/20";
      case "express": return "bg-rail-express/10 text-rail-express border-rail-express/20";
      case "local": return "bg-rail-local/10 text-rail-local border-rail-local/20";
      case "freight": return "bg-rail-freight/10 text-rail-freight border-rail-freight/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time": return "bg-success/10 text-success border-success/20";
      case "delayed": return "bg-warning/10 text-warning border-warning/20";
      case "early": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="w-full bg-card border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Schedule View</h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Live Updates</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-3">
          {mockSchedule.map((item) => (
            <div
              key={item.trainId}
              className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border/50 hover:bg-card/70 transition-colors"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex items-center space-x-2">
                  <Train className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {item.trainName}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {item.trainId}
                    </p>
                  </div>
                </div>

                <Badge className={getTypeColor(item.type)}>
                  {item.type}
                </Badge>

                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {item.from} → {item.to}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono text-foreground">
                      {item.actualTime}
                    </span>
                    {item.status !== "on-time" && (
                      <span className="text-xs text-muted-foreground">
                        (Sch: {item.scheduledTime})
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Platform {item.platform} • {item.track}
                  </div>
                </div>

                <Badge className={getStatusColor(item.status)}>
                  {item.status === "delayed" && item.delay > 0 
                    ? `+${item.delay}m` 
                    : item.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">4</div>
              <div className="text-xs text-muted-foreground">Total Trains</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">1</div>
              <div className="text-xs text-muted-foreground">On Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">3</div>
              <div className="text-xs text-muted-foreground">Delayed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">7.5</div>
              <div className="text-xs text-muted-foreground">Avg Delay (min)</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};