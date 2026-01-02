import { Outlet } from "react-router";
import AuthLayout from "../components/layout/AuthLayout";

function AuthShell() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}

export default AuthShell;
