// Mock data for Railway Traffic Control Dashboard

export interface Train {
  id: string;
  name: string;
  type: "premium" | "express" | "local" | "freight" | "special";
  status: "on-time" | "delayed" | "holding" | "departed";
  delay: number;
  platform: string;
  eta: string;
  position: number; // percentage along track
  direction: "up" | "down";
  priority: number;
  speed: number; // km/h
  location: string;
  nextStation: string;
  conflict?: boolean;
}

export interface Station {
  id: string;
  name: string;
  position: number;
  platforms: string[];
  capacity: number;
  currentTrains: number;
  coordinates: [number, number]; // [lat, lng] for Leaflet
}

export interface TrackSection {
  id: string;
  name: string;
  start: string;
  end: string;
  length: number; // km
  maxSpeed: number;
  status: "clear" | "occupied" | "maintenance" | "blocked";
  trains: string[]; // train IDs currently on this section
}

// Sample train data
export const mockTrains: Train[] = [
  {
    id: "T001",
    name: "Rajdhani Express",
    type: "express",
    status: "delayed",
    delay: 9,
    platform: "Platform-2",
    eta: "14:28",
    position: 25,
    direction: "up",
    priority: 1,
    speed: 110,
    location: "Platform-2",
    nextStation: "Kalyan",
    conflict: false
  },
  {
    id: "T002",
    name: "Local Passenger",
    type: "local",
    status: "delayed", 
    delay: 2,
    platform: "Station-C",
    eta: "14:15",
    position: 45,
    direction: "down",
    priority: 3,
    speed: 60,
    location: "Station-C", 
    nextStation: "Junction-A",
    conflict: false
  },
  {
    id: "T003",
    name: "Goods Special",
    type: "freight",
    status: "delayed",
    delay: 7,
    platform: "Yard-B",
    eta: "14:45",
    position: 15,
    direction: "up",
    priority: 4,
    speed: 45,
    location: "Yard-B",
    nextStation: "Platform-1",
    conflict: false
  },
  {
    id: "T004",
    name: "Shatabdi Express",
    type: "express", 
    status: "delayed",
    delay: 6,
    platform: "Junction-A",
    eta: "14:22",
    position: 65,
    direction: "down",
    priority: 1,
    speed: 130,
    location: "Junction-A",
    nextStation: "Platform-1",
    conflict: true
  },
  {
    id: "T005",
    name: "EMU Local",
    type: "local",
    status: "delayed",
    delay: 7,
    platform: "Platform-1",
    eta: "14:18",
    position: 85,
    direction: "up",
    priority: 3,
    speed: 55,
    location: "Platform-1",
    nextStation: "Terminal",
    conflict: false
  }
];

// Sample station data  
export const mockStations: Station[] = [
  {
    id: "st1",
    name: "Junction-A",
    position: 50,
    platforms: ["1", "2", "3"],
    capacity: 3,
    currentTrains: 2,
    coordinates: [28.6139, 77.2090]
  },
  {
    id: "st2", 
    name: "Platform 2",
    position: 25,
    platforms: ["Platform 2"],
    capacity: 1,
    currentTrains: 1,
    coordinates: [28.6129, 77.2080]
  },
  {
    id: "st3",
    name: "Platform 3", 
    position: 75,
    platforms: ["Platform 3"],
    capacity: 1,
    currentTrains: 0,
    coordinates: [28.6149, 77.2100]
  }
];

// Sample track sections
export const mockTrackSections: TrackSection[] = [
  {
    id: "ts1",
    name: "Main Line UP",
    start: "Junction-A",
    end: "Platform 2", 
    length: 2.5,
    maxSpeed: 110,
    status: "occupied",
    trains: ["T001", "T003"]
  },
  {
    id: "ts2",
    name: "Main Line DOWN",
    start: "Platform 3", 
    end: "Junction-A",
    length: 2.5, 
    maxSpeed: 110,
    status: "occupied",
    trains: ["T002", "T004"]
  },
  {
    id: "ts3",
    name: "Loop Line",
    start: "Junction-A",
    end: "Yard-B",
    length: 1.2,
    maxSpeed: 60,
    status: "clear",
    trains: []
  }
];

// Live data simulation helpers
export const getRandomDelay = () => Math.floor(Math.random() * 15);
export const getRandomSpeed = (baseSpeed: number) => baseSpeed + Math.floor(Math.random() * 20 - 10);
export const getRandomPosition = () => Math.floor(Math.random() * 100);

// Function to simulate real-time updates
export const simulateDataUpdate = (currentTrains: Train[]): Train[] => {
  return currentTrains.map(train => ({
    ...train,
    // Simulate slight position changes
    position: Math.min(100, train.position + (Math.random() * 2 - 1)),
    // Occasionally update delays
    delay: Math.random() < 0.1 ? getRandomDelay() : train.delay,
    // Simulate speed variations
    speed: Math.random() < 0.2 ? getRandomSpeed(train.speed) : train.speed
  }));
};