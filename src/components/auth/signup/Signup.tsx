import { useEffect, useState } from "react";

import { useSignupStore } from "@/stores/useSignupStore";

import AuthHeader from "../AuthHeader";
import SignupForm from "./SignupForm";

export default function Signup() {
  const [hideHeader, setHideHeader] = useState(false);
  const resetSignup = useSignupStore(s => s.resetSignup);
  const isVerified = useSignupStore(s => s.isVerified);

  // 페이지 진입 시 store 초기화
  useEffect(() => {
    resetSignup();
  }, [resetSignup]);

  return (
    <div
      className={`flex h-[100dvh] flex-col items-center overflow-hidden px-4 ${
        isVerified ? "gap-15" : "gap-30"
      }`}
    >
      {!hideHeader && <AuthHeader />}

      <SignupForm setHideHeader={setHideHeader} />
    </div>
  );
}
