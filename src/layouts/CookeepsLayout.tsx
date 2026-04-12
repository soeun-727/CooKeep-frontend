// layouts/CookeepsLayout.tsx
import { Outlet } from "react-router-dom";

export default function CookeepsLayout() {
  return (
    <div className="flex-1 h-full flex flex-col no-scrollbar">
      <Outlet />
    </div>
  );
}
