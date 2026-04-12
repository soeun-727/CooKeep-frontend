import { create } from "zustand";
import { sendPasswordChangeCode, verifyPasswordChangeCode } from "../api/user";

interface EditPasswordAuthState {
  phone: string;
  isCodeSent: boolean;
  isVerified: boolean;

  setPhone: (phone: string) => void;
  sendCode: () => Promise<void>;
  verifyCode: (code: string) => Promise<boolean>;
  reset: () => void;
}

export const useEditPasswordAuthStore = create<EditPasswordAuthState>(
  (set, get) => ({
    phone: "",
    isCodeSent: false,
    isVerified: false,

    setPhone: (phone) => set({ phone: phone.replace(/[^0-9]/g, "") }),

    sendCode: async () => {
      const { phone } = get();
      await sendPasswordChangeCode(phone);
      set({ isCodeSent: true });
    },

    verifyCode: async (code: string) => {
      const { phone } = get();

      try {
        await verifyPasswordChangeCode(phone, code);
        set({ isVerified: true });
        return true;
      } catch {
        return false;
      }
    },

    reset: () =>
      set({
        phone: "",
        isCodeSent: false,
        isVerified: false,
      }),
  }),
);
