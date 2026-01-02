import React from "react";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-page">
      <div className="app-card">
        {children}
        {/* tutaj pojawi się user, main itp */}
      </div>
    </div>
  );
}

export default AppLayout;
