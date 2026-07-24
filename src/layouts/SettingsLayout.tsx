import { Outlet } from "react-router-dom";

export default function SettingsLayout() {
  return (
    <div className="flex h-screen flex-col">
      <div className="no-scrollbar flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
