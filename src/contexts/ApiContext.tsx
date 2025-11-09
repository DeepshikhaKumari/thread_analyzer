import React, { createContext, useContext, useState, ReactNode } from "react";

// Thread type
export type Thread = {
  name: string;
  id: number;
  daemon: boolean;
  priority: number | null;
  state: string;
  stackTrace: string[];
  locks: string[];
};

// Performance metrics type
export type PerformanceMetrics = {
  cpuUsageTimeline: number[];
  memoryUsageTimeline: number[];
  threadCountTimeline: number[];
  responseTimeTimeline: number[];
};

// Summary type
export type Summary = {
  totalThreads: number;
  deadlocks: number;
  blockedThreads: number;
  cpuUsage: number;
  avgResponseTime: number;
  threadStates: Record<string, number>;
  totalThreadStates: number;
  performanceMetrics: PerformanceMetrics;
  threads: Thread[];
};

// Context type
type ApiContextType = {
  summary: Summary | null;
  setSummaryData: (data: Summary) => void;
};

// Create context
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Provider
export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [summary, setSummary] = useState<Summary | null>(null);

  const setSummaryData = (data: Summary) => {
    setSummary(data);
  };

  return (
    <ApiContext.Provider value={{ summary, setSummaryData }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) throw new Error("useApi must be used within ApiProvider");
  return context;
};
