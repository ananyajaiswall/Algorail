import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, RotateCcw, Train, MapPin } from "lucide-react";

// Mock train data for schematic visualization
const mockTrains = [
  {
    id: "12951",
    name: "Mumbai Rajdhani",
    type: "premium",
    status: "on-time",
    delay: 0,
    platform: "2/4",
    eta: "12:45",
    position: 15, // percentage along track
    direction: "up"
  },
  {
    id: "12137",
    name: "Punjab Mail",
    type: "express",
    status: "delayed",
    delay: 8,
    platform: "1/3",
    eta: "13:20",
    position: 45,
    direction: "up"
  },
  {
    id: "18609",
    name: "Loco Pilot Special",
    type: "local",
    status: "on-time",
    delay: 0,
    platform: "S5",
    eta: "12:52",
    position: 75,
    direction: "down"
  },
  {
    id: "59381",
    name: "Freight 59381",
    type: "freight",
    status: "holding",
    delay: 12,
    platform: "LOOP",
    eta: "14:15",
    position: 60,
    direction: "up"
  }
];

const stations = [
  { name: "CST", position: 0, platforms: ["2", "4"] },
  { name: "Kalyan", position: 25, platforms: ["1", "3"] },
  { name: "Asangaon", position: 50, platforms: ["S5"] },
  { name: "Kasara", position: 75, platforms: ["1", "3"] },
  { name: "Igatpuri", position: 100, platforms: ["LOOP"] }
];

export const NetworkSchematic = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [aiRecommendationsVisible, setAiRecommendationsVisible] = useState(true);

  const getTrainColor = (type: string) => {
    switch (type) {
      case "premium": return "bg-rail-premium border-rail-premium";
      case "express": return "bg-rail-express border-rail-express";
      case "local": return "bg-rail-local border-rail-local";
      case "freight": return "bg-rail-freight border-rail-freight";
      default: return "bg-muted border-muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time": return "bg-success";
      case "delayed": return "bg-warning";
      case "holding": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const filteredTrains = selectedFilter === "all" 
    ? mockTrains 
    : mockTrains.filter(train => train.type === selectedFilter);

  return (
    <Card className="w-full h-[500px] lg:h-[600px] bg-card border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Network Schematic</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={aiRecommendationsVisible ? "default" : "outline"}
              size="sm"
              onClick={() => setAiRecommendationsVisible(!aiRecommendationsVisible)}
            >
              AI Recommendations
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={selectedFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("all")}
          >
            All Types
          </Button>
          <Button
            variant={selectedFilter === "premium" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("premium")}
          >
            Premium
          </Button>
          <Button
            variant={selectedFilter === "express" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("express")}
          >
            Express
          </Button>
          <Button
            variant={selectedFilter === "local" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("local")}
          >
            Local
          </Button>
          <Button
            variant={selectedFilter === "freight" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("freight")}
          >
            Freight
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing: {filteredTrains.length} trains
        </div>
      </div>

      {/* Schematic View */}
      <div className="p-6 h-full">
        <div className="relative h-full">
          {/* Main Track Lines */}
          <div className="relative h-32 mb-8">
            {/* UP Track */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-primary/60 rounded"></div>
            <div className="absolute top-2 left-0 text-xs text-muted-foreground">UP</div>
            
            {/* DOWN Track */}
            <div className="absolute top-16 left-0 right-0 h-1 bg-primary/60 rounded"></div>
            <div className="absolute top-12 left-0 text-xs text-muted-foreground">DN</div>
            
            {/* LOOP Track */}
            <div className="absolute top-26 left-1/4 right-1/4 h-1 bg-primary/40 rounded"></div>
            <div className="absolute top-22 left-1/4 text-xs text-muted-foreground">LOOP</div>

            {/* Stations */}
            {stations.map((station, index) => (
              <div
                key={station.name}
                className="absolute top-0 bottom-0 flex flex-col items-center"
                style={{ left: `${station.position}%` }}
              >
                <div className="w-0.5 h-full bg-border"></div>
                <div className="absolute -top-6 bg-card border border-border rounded px-2 py-1">
                  <div className="text-xs font-semibold text-foreground">{station.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {station.platforms.join('/')}
                  </div>
                </div>
              </div>
            ))}

            {/* Trains */}
            {filteredTrains.map((train) => (
              <motion.div
                key={train.id}
                className="absolute"
                style={{ 
                  left: `${train.position}%`,
                  top: train.direction === "up" ? "20px" : 
                       train.platform === "LOOP" ? "100px" : "60px"
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className={`
                  w-8 h-6 rounded border-2 flex items-center justify-center relative
                  ${getTrainColor(train.type)}
                `}>
                  <Train className="w-3 h-3 text-current" />
                  
                  {/* Status indicator */}
                  <div className={`
                    absolute -top-1 -right-1 w-3 h-3 rounded-full
                    ${getStatusColor(train.status)}
                  `}></div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 
                                  bg-popover border border-border rounded p-2 
                                  opacity-0 hover:opacity-100 transition-opacity
                                  min-w-48 z-10">
                    <div className="text-xs space-y-1">
                      <div className="font-semibold">{train.name}</div>
                      <div>ID: {train.id}</div>
                      <div>Type: {train.type}</div>
                      <div>Platform: {train.platform}</div>
                      <div>ETA: {train.eta}</div>
                      {train.delay > 0 && (
                        <div className="text-warning">Delay: +{train.delay}m</div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-rail-premium rounded border border-rail-premium"></div>
                <span>Premium</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-rail-express rounded border border-rail-express"></div>
                <span>Express</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-rail-local rounded border border-rail-local"></div>
                <span>Local</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-rail-freight rounded border border-rail-freight"></div>
                <span>Freight</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};