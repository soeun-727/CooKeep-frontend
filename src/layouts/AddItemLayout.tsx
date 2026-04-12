// src/layouts/AddItemLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import BackHeader from "../components/ui/BackHeader";

export default function AddItemLayout() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen bg-[#FAFAFA] overflow-hidden">
      <BackHeader title="재료 등록" onBack={() => navigate(-1)} />

      <main className="flex-1 min-h-0 pb-[13px]">
        <Outlet />
      </main>
    </div>
  );
}
