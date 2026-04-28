// src/stores/useFindPasswordStore.ts
import { create } from "zustand";
import { sendPasswordCodeApi, verifyPasswordCodeApi } from "../api/auth";
import axios from "axios";

interface FindPasswordState {
  email: string;
  isCodeSent: boolean;
  isVerified: boolean;

  setEmail: (email: string) => void;
  sendCode: () => Promise<void>;
  verifyCode: (code: string) => Promise<boolean>;
  reset: () => void;
}

export const useFindPasswordStore = create<FindPasswordState>((set, get) => ({
  email: "",
  isCodeSent: false,
  isVerified: false,

  setEmail: (email) => set({ email }),

  sendCode: async () => {
    const { email } = get();

    try {
      await sendPasswordCodeApi(email);
      set({ isCodeSent: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 404) {
          throw new Error("가입된 이메일이 없습니다.");
        }
        if (status === 429) {
          throw new Error("인증 요청이 너무 빠릅니다.");
        }
      }
      throw new Error("인증번호 발송 실패");
    }
  },

  verifyCode: async (code) => {
    const { email } = get();

    try {
      await verifyPasswordCodeApi(email, code);
      set({ isVerified: true });
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 400) {
          // throw new Error("인증번호가 일치하지 않거나 만료되었습니다.");
          throw new Error("인증번호가 일치하지 않습니다.");
        }

        if (status === 404) {
          throw new Error("인증 요청 내역이 없습니다.");
        }

        if (status === 429) {
          throw new Error("인증 시도 횟수를 초과했습니다.");
        }
      }

      throw new Error("인증 중 오류가 발생했습니다.");
    }
  },

  reset: () =>
    set({
      email: "",
      isCodeSent: false,
      isVerified: false,
    }),
}));
