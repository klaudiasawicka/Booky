import * as React from "react";
import Input from "./ui/Input";

export function IconInput({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </span>
      <Input {...props} />
    </div>
  );
}
