import { create } from "zustand";
import { sendUpdatePhoneCode, verifyUpdatePhoneCode } from "../api/user";
import axios from "axios";

interface PhoneUpdateState {
  phone: string;
  isCodeSent: boolean;
  setPhone: (phone: string) => void;
  // API 호출 액션
  requestSendCode: () => Promise<{ success: boolean; errorStatus?: number }>;
  requestVerifyCode: (
    code: string,
  ) => Promise<{ success: boolean; errorStatus?: number }>;
  reset: () => void;
}

export const usePhoneUpdateStore = create<PhoneUpdateState>((set, get) => ({
  phone: "",
  isCodeSent: false,

  setPhone: (phone) => set({ phone }),

  // 인증번호 발송 API 연결
  requestSendCode: async () => {
    try {
      const { phone } = get();
      await sendUpdatePhoneCode(phone.replace(/-/g, ""));
      set({ isCodeSent: true });
      return { success: true };
    } catch (error: unknown) {
      // any를 unknown으로 변경
      // axios 에러인지 확인하여 안전하게 status 추출
      const errorStatus = axios.isAxiosError(error)
        ? error.response?.status
        : undefined;
      return { success: false, errorStatus };
    }
  },

  // 인증번호 확인 API 연결
  requestVerifyCode: async (code: string) => {
    try {
      const { phone } = get();
      await verifyUpdatePhoneCode(phone.replace(/-/g, ""), code);
      return { success: true };
    } catch (error: unknown) {
      // any를 unknown으로 변경
      const errorStatus = axios.isAxiosError(error)
        ? error.response?.status
        : undefined;
      return { success: false, errorStatus };
    }
  },

  reset: () => set({ phone: "", isCodeSent: false }),
}));
