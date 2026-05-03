import { AppShell } from "../shared/components/AppShell";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <AppShell>{children}</AppShell>;
};

export default DashboardLayout;
