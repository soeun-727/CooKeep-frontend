import { Outlet } from "react-router-dom";

export default function CookeepsLayout() {
  return (
    <div className="no-scrollbar flex h-full flex-1 flex-col">
      <Outlet />
    </div>
  );
}
