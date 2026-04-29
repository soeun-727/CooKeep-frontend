import { create } from "zustand";
import { sendUpdateEmailCode, verifyUpdateEmailCode } from "../api/user";
import axios from "axios";

interface EmailUpdateState {
  email: string;
  isCodeSent: boolean;
  isVerified: boolean; // 추가
  setEmail: (email: string) => void;
  requestSendCode: () => Promise<{ success: boolean; errorStatus?: number }>;
  requestVerifyCode: (
    code: string,
  ) => Promise<{ success: boolean; errorStatus?: number }>;
  reset: () => void;
}

export const useEmailUpdateStore = create<EmailUpdateState>((set, get) => ({
  email: "",
  isCodeSent: false,
  isVerified: false,

  setEmail: (email) => set({ email }),

  requestSendCode: async () => {
    try {
      await sendUpdateEmailCode(get().email);
      set({ isCodeSent: true });
      return { success: true };
    } catch (error) {
      const errorStatus = axios.isAxiosError(error)
        ? error.response?.status
        : undefined;
      return { success: false, errorStatus };
    }
  },

  requestVerifyCode: async (code) => {
    try {
      await verifyUpdateEmailCode(get().email, code);
      set({ isVerified: true }); // 추가
      return { success: true };
    } catch (error) {
      const errorStatus = axios.isAxiosError(error)
        ? error.response?.status
        : undefined;
      return { success: false, errorStatus };
    }
  },

  reset: () => set({ email: "", isCodeSent: false, isVerified: false }),
}));
