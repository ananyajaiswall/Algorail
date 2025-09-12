import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Filter, 
  RotateCcw, 
  Train as TrainIcon, 
  MapPin,
  AlertTriangle,
  Clock,
  Activity
} from "lucide-react";
import { mockTrains, mockStations, simulateDataUpdate, type Train } from "@/data/mockData";
export const EnhancedNetworkSchematic = () => {
  const [trains, setTrains] = useState<Train[]>(mockTrains);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [conflictsVisible, setConflictsVisible] = useState(true);
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);

  // Real-time simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTrains(prevTrains => simulateDataUpdate(prevTrains));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredTrains = selectedFilter === "all" 
    ? trains 
    : trains.filter(train => train.type === selectedFilter);

  const conflictTrains = trains.filter(train => train.conflict);

  return (
    <Card className="w-full h-[600px] bg-control-panel border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Network Topology</h2>
          <div className="flex items-center space-x-2">
            <Badge 
              variant={conflictsVisible ? "destructive" : "outline"}
              className="cursor-pointer"
              onClick={() => setConflictsVisible(!conflictsVisible)}
            >
              <AlertTriangle className="w-3 h-3 mr-1" />
              Conflicts {conflictTrains.length > 0 && `(${conflictTrains.length})`}
            </Badge>
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
            All Trains
          </Button>
          <Button
            variant={selectedFilter === "express" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("express")}
            className="text-rail-express border-rail-express"
          >
            Express
          </Button>
          <Button
            variant={selectedFilter === "local" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("local")}
            className="text-rail-local border-rail-local"
          >
            Local
          </Button>
          <Button
            variant={selectedFilter === "freight" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("freight")}
            className="text-rail-freight border-rail-freight"
          >
            Freight
          </Button>
          <Button
            variant={selectedFilter === "special" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("special")}
            className="text-rail-special border-rail-special"
          >
            Special
          </Button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Showing: {filteredTrains.length} trains
          </span>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-status-online rounded-full"></div>
              <span>On Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-status-warning rounded-full"></div>
              <span>Delayed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-status-critical rounded-full animate-blink"></div>
              <span>Conflict</span>
            </div>
          </div>
        </div>
      </div>

      {/* Network Schematic - Simplified View */}
      <div className="h-full relative bg-control-panel rounded-b-lg">
        {/* Schematic Grid */}
        <div className="h-full w-full relative overflow-hidden">
          {/* Track Layout */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-4xl h-64">
              {/* Main Track Lines */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-rail-primary transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-rail-primary transform -translate-y-1/2 mt-4"></div>
              
              {/* Stations */}
              {mockStations.map((station, index) => (
                <div
                  key={station.id}
                  className="absolute w-4 h-4 bg-rail-secondary rounded border-2 border-rail-primary"
                  style={{
                    left: `${20 + index * 30}%`,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-foreground whitespace-nowrap">
                    {station.name}
                  </div>
                </div>
              ))}
              
              {/* Train Tokens */}
              {filteredTrains.map((train) => {
                const colors = {
                  premium: 'bg-rail-premium',
                  express: 'bg-rail-express', 
                  local: 'bg-rail-local',
                  freight: 'bg-rail-freight',
                  special: 'bg-rail-special'
                };
                
                return (
                  <motion.div
                    key={train.id}
                    className={`absolute w-3 h-3 rounded-full ${colors[train.type]} border-2 ${
                      train.conflict ? 'border-status-critical animate-pulse' : 'border-white'
                    } cursor-pointer`}
                    style={{
                      left: `${10 + (train.position / 100) * 80}%`,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                    animate={{
                      x: [0, 2, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    onClick={() => setSelectedTrain(train.id)}
                    title={`${train.name} - ${train.status} - ETA: ${train.eta}`}
                  />
                );
              })}
              
              {/* Junction Points */}
              <div className="absolute left-1/2 top-1/2 w-6 h-6 bg-rail-accent rounded-full border-2 border-rail-primary transform -translate-x-1/2 -translate-y-1/2">
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-foreground">
                  Junction-A
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Status Overlay */}
        <div className="absolute top-4 left-4 bg-control-panel/90 backdrop-blur-sm border border-border rounded-lg p-3">
          <h3 className="text-sm font-semibold text-foreground mb-2">Live Train Status</h3>
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <span className="text-muted-foreground">On Time:</span>
                <span className="ml-2 text-status-online font-medium">
                  {trains.filter(t => t.status === 'on-time').length}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Delayed:</span>
                <span className="ml-2 text-status-warning font-medium">
                  {trains.filter(t => t.status === 'delayed').length}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Conflicts:</span>
                <span className="ml-2 text-status-critical font-medium">
                  {conflictTrains.length}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Cum Delay:</span>
                <span className="ml-2 text-foreground font-medium">
                  {trains.reduce((acc, t) => acc + t.delay, 0)}m
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Train Details Panel */}
        {selectedTrain && (
          <div className="absolute bottom-4 right-4 bg-control-panel/95 backdrop-blur-sm border border-border rounded-lg p-4 w-64">
            {(() => {
              const train = trains.find(t => t.id === selectedTrain);
              if (!train) return null;
              
              return (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-foreground">{train.name}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTrain(null)}
                      className="h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>
                  <div className="text-xs space-y-1 text-muted-foreground">
                    <p><strong>ID:</strong> {train.id}</p>
                    <p><strong>Type:</strong> {train.type}</p>
                    <p><strong>Location:</strong> {train.location}</p>
                    <p><strong>ETA:</strong> {train.eta}</p>
                    <p><strong>Speed:</strong> {train.speed} km/h</p>
                    {train.delay > 0 && (
                      <p className="text-status-warning">
                        <strong>Delay:</strong> +{train.delay}m
                      </p>
                    )}
                    {train.conflict && (
                      <p className="text-status-critical font-medium">
                        <AlertTriangle className="w-3 h-3 inline mr-1" />
                        CONFLICT DETECTED
                      </p>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </Card>
  );
};