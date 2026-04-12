// src/components/auth/Signup.tsx

import { useState, useEffect } from "react";
import AuthHeader from "../AuthHeader";
import SignupForm from "./SignupForm";
import { useSignupStore } from "../../../stores/useSignupStore";

const Signup = () => {
  const [hideHeader, setHideHeader] = useState(false);
  const resetSignup = useSignupStore((s) => s.resetSignup);

  // 페이지 진입 시 store 초기화
  useEffect(() => {
    resetSignup();
  }, [resetSignup]);

  return (
    <div className="h-[100dvh] flex flex-col items-center overflow-hidden bg-gray-50">
      {!hideHeader && <AuthHeader />}

      <SignupForm setHideHeader={setHideHeader} />
    </div>
  );
};

export default Signup;
