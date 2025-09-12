import React from "react";
import { EnhancedAIRecommendations } from "@/components/dashboard/EnhancedAIRecommendations";
import { ControlSidebar } from "@/components/dashboard/ControlSidebar";
import { EnhancedHeader } from "@/components/dashboard/EnhancedHeader";

const AIRecommendationsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <ControlSidebar />
      <div className="flex-1 flex flex-col">
        <EnhancedHeader />
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold">AI Algorithm Recommendations</h1>
          <EnhancedAIRecommendations />
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationsPage;