// src/components/auth/find/RequireFindAuth.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useFindPasswordStore } from "@/stores/useFindPasswordStore";

interface RequireFindAuthProps {
  children: ReactNode;
}

export default function RequireFindAuth({ children }: RequireFindAuthProps) {
  const isVerified = useFindPasswordStore(s => s.isVerified);

  // 개발 환경에서는 인증 우회
  // if (import.meta.env.DEV) {
  //   return children;
  // }

  return isVerified ? children : <Navigate to="/find" replace />;
}
