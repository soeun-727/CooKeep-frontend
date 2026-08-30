import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useFindPasswordStore } from "@/stores/useFindPasswordStore";

interface RequireFindAuthProps {
  children: ReactNode;
}

export default function RequireFindAuth({ children }: RequireFindAuthProps) {
  const isVerified = useFindPasswordStore(s => s.isVerified);

  return isVerified ? children : <Navigate to="/find" replace />;
}
