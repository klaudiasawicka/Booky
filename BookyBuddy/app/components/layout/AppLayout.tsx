import React from "react";
import Navbar from "../navbar";
import { Outlet } from "react-router";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </>
  );
}

export default AppLayout;
