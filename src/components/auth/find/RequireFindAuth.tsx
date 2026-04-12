// src/components/auth/find/RequireFindAuth.tsx
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useFindPasswordStore } from "../../../stores/useFindPasswordStore";

type Props = {
  children: ReactNode;
};

export default function RequireFindAuth({ children }: Props) {
  const isVerified = useFindPasswordStore((s) => s.isVerified);

  // 개발 환경에서는 인증 우회
  if (import.meta.env.DEV) {
    return children;
  }

  return isVerified ? children : <Navigate to="/find" replace />;
}
