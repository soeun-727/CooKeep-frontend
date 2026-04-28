// src/store/useSignupStore.ts
import { create } from "zustand";
import { sendSignupCodeApi, verifySignupCodeApi } from "../api/auth";
import axios from "axios";

interface VerifyResult {
  success: boolean;
  message?: string;
}

interface SignupState {
  email: string;
  isCodeSent: boolean;
  isVerified: boolean;

  setEmail: (email: string) => void;
  setIsVerified: (value: boolean) => void;
  sendCode: () => Promise<void>;
  verifyCode: (code: string) => Promise<VerifyResult>;
  resetSignup: () => void;
}

export const useSignupStore = create<SignupState>((set, get) => ({
  email: "",
  isCodeSent: false,
  isVerified: false,

  setEmail: (email) =>
    set({
      email,
      isVerified: false,
      isCodeSent: false,
    }),

  setIsVerified: (value: boolean) => set({ isVerified: value }),

  sendCode: async () => {
    const email = get().email;
    if (!email) throw new Error("이메일이 없습니다.");

    await sendSignupCodeApi(email);
    set({ isCodeSent: true, isVerified: false });
  },

  verifyCode: async (code: string) => {
    const email = get().email;

    try {
      await verifySignupCodeApi(email, code);
      return { success: true };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 400) {
          return { success: false, message: "인증번호가 일치하지 않습니다." };
        }

        if (status === 404) {
          return { success: false, message: "인증 요청 내역이 없습니다." };
        }

        if (status === 429) {
          return { success: false, message: "인증 시도 횟수를 초과했습니다." };
        }
      }

      return { success: false, message: "인증 중 오류가 발생했습니다." };
    }
  },

  resetSignup: () =>
    set({
      email: "",
      isCodeSent: false,
      isVerified: false,
    }),
}));
