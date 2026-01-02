import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8">
        {children}
        {/* tutaj pojawi się reegiste.txs lub login zaleznosci od panelu. */}
      </div>
    </div>
  );
}

export default AuthLayout;
