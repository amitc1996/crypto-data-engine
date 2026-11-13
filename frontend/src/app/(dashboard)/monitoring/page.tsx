
import MonitoringDashboard from "@/features/monitoring/components/MonitoringDashboard";

import { mockMonitoringData } from "@/mocks/monitoring";

export default function MonitoringPage() {
  return (
    <MonitoringDashboard data={mockMonitoringData} />
  );
}
