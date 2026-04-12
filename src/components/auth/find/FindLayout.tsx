// src/components/auth/find/FindLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import BackHeader from "../../ui/BackHeader";

export default function FindLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <BackHeader title="비밀번호 찾기" onBack={() => navigate(-1)} />
      <Outlet />
    </div>
  );
}
