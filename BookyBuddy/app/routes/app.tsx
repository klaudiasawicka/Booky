import { Outlet } from "react-router";
import AppLayout from "../components/layout/AppLayout";

function AppShell() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
export default AppShell;
