import { ControlSidebar } from "@/components/dashboard/ControlSidebar";
import { EnhancedHeader } from "@/components/dashboard/EnhancedHeader";
import { EnhancedNetworkSchematic } from "@/components/dashboard/EnhancedNetworkSchematic";
import { EnhancedAIRecommendations } from "@/components/dashboard/EnhancedAIRecommendations";
import { ScheduleView } from "@/components/dashboard/ScheduleView";
import { QuickActions } from "@/components/dashboard/QuickActions";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Control Sidebar (now contains NotificationsPanel) */}
      <ControlSidebar />

      {/* Main Dashboard Area */}
      <div className="flex-1 flex flex-col">
        <EnhancedHeader />

        <div className="flex-1 p-6 grid grid-cols-12 gap-6">
          {/* Left Column - Network & Schedule */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <EnhancedNetworkSchematic />
            <ScheduleView />
          </div>

            {/* Right Column - AI Recommendations & (Quick Actions only now) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <EnhancedAIRecommendations />
            <div className="grid grid-cols-1 gap-6">
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;