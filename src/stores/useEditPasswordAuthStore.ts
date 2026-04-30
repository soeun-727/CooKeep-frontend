import { create } from "zustand";
import { sendPasswordChangeCode, verifyPasswordChangeCode } from "../api/user";

interface EditPasswordAuthState {
  email: string;
  isCodeSent: boolean;
  isVerified: boolean;

  setEmail: (email: string) => void;
  sendCode: () => Promise<void>;
  verifyCode: (code: string) => Promise<boolean>;
  reset: () => void;
}

export const useEditPasswordAuthStore = create<EditPasswordAuthState>(
  (set, get) => ({
    email: "",
    isCodeSent: false,
    isVerified: false,

    setEmail: (email) => set({ email }),

    sendCode: async () => {
      const { email } = get();
      await sendPasswordChangeCode(email);
      set({ isCodeSent: true });
    },

    verifyCode: async (code: string) => {
      const { email } = get();

      try {
        await verifyPasswordChangeCode(email, code);
        set({ isVerified: true });
        return true;
      } catch {
        return false;
      }
    },

    reset: () =>
      set({
        email: "",
        isCodeSent: false,
        isVerified: false,
      }),
  }),
);
