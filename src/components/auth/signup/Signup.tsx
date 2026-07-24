import { useEffect, useState } from "react";

import { useSignupStore } from "@/stores/useSignupStore";

import AuthHeader from "../AuthHeader";
import SignupForm from "./SignupForm";

export default function Signup() {
  const [hideHeader, setHideHeader] = useState(false);
  const resetSignup = useSignupStore(s => s.resetSignup);

  // 페이지 진입 시 store 초기화
  useEffect(() => {
    resetSignup();
  }, [resetSignup]);

  return (
    <div className="flex h-[100dvh] flex-col items-center overflow-hidden px-4">
      {!hideHeader && <AuthHeader />}

      <SignupForm setHideHeader={setHideHeader} />
    </div>
  );
}
