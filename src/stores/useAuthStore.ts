import { create } from "zustand";
import { persist } from "zustand/middleware";
import { saveTokens, clearTokens } from "../utils/auth";
import { loginApi, logoutApi } from "../api/auth";
import axios from "axios";
import { useSignupStore } from "./useSignupStore";
import { usePhoneUpdateStore } from "./usePhoneUpdateStore";
import { useFindPasswordStore } from "./useFindPasswordStore";
import { useEditPasswordAuthStore } from "./useEditPasswordAuthStore";

interface SocialLoginPayload {
  userId: number;
  accessToken: string;
  refreshToken: string;
  nextStep: "TERMS" | "ONBOARDING" | "HOME" | string;
  userStatus: string;
}

interface LoginResponse {
  success: boolean;
  isFirst: boolean;
}

interface AuthState {
  phoneNumber: string;
  password: string;
  isValidPhone: boolean;
  isValidPW: boolean;
  canLogin: boolean;
  isSubmitting: boolean;
  isLoggedIn: boolean;
  userId: number | null;
  userStatus: string | null;
  nextStep: string | null;
  initialized: boolean;
  lastLoginAt: number | null;
  initializeAuth: () => void;
  setPhoneNumber: (phone: string) => void;
  setPassword: (pw: string) => void;
  login: () => Promise<LoginResponse | null>;
  loginSocial: (payload: SocialLoginPayload) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      phoneNumber: "",
      password: "",
      isValidPhone: false,
      isValidPW: false,
      canLogin: false,
      isSubmitting: false,
      isLoggedIn: false,
      userId: null,
      userStatus: null,
      nextStep: null,
      initialized: false,
      lastLoginAt: null,

      initializeAuth: () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        // 토큰이 둘 다 없다면 확실히 로그아웃 상태
        if (!accessToken || !refreshToken) {
          get().logout();
          set({ initialized: true });
          return;
        }

        // 토큰이 있다면 일단 로그인 상태로 간주 (실제 만료 여부는 API 요청 시 Axios Interceptor가 처리)
        set({
          isLoggedIn: true,
          initialized: true,
        });
      },

      login: async () => {
        const { phoneNumber, password, canLogin } = get();
        if (!canLogin) return null;

        try {
          set({ isSubmitting: true });
          const purePhoneNumber = phoneNumber.replace(/-/g, "");
          const data = await loginApi({
            phoneNumber: purePhoneNumber,
            password,
          });

          saveTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });

          set({
            isLoggedIn: true,
            userId: data.userId,
            userStatus: data.userStatus,
            isSubmitting: false,
            initialized: true,
          });

          return {
            success: true,
            isFirst: data.userStatus === "CREATED",
          };
        } catch (err) {
          set({ isSubmitting: false });
          if (axios.isAxiosError(err)) {
            const code = err.response?.data?.code;
            if (code === "AUTH-004") {
              alert("가입되지 않은 전화번호입니다.");
            } else if (code === "AUTH-003") {
              alert("비밀번호가 올바르지 않습니다.");
            } else {
              alert(
                err.response?.data?.message || "로그인 중 오류가 발생했습니다.",
              );
            }
          } else {
            alert("네트워크 연결이 원활하지 않습니다.");
          }
          return { success: false, isFirst: false };
        }
      },

      logout: async () => {
        try {
          if (localStorage.getItem("accessToken")) {
            await logoutApi();
          }
        } catch (error) {
          console.error("Logout API error:", error);
        } finally {
          clearTokens();
          set({
            isLoggedIn: false,
            userId: null,
            userStatus: null,
            nextStep: null,
            phoneNumber: "",
            password: "",
            canLogin: false,
            initialized: true,
          });
          useSignupStore.getState().resetSignup?.();
          usePhoneUpdateStore.getState().reset?.();
          useFindPasswordStore.getState().reset?.();
          useEditPasswordAuthStore.getState().reset?.();
        }
      },

      setPhoneNumber: (phoneNumber) => {
        const isValidPhone = /^010-\d{3,4}-\d{4}$/.test(phoneNumber);
        set((state) => ({
          phoneNumber,
          isValidPhone,
          canLogin: isValidPhone && state.isValidPW,
        }));
      },

      setPassword: (password) => {
        const isValidPW = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);
        set((state) => ({
          password,
          isValidPW,
          canLogin: state.isValidPhone && isValidPW,
        }));
      },

      loginSocial: (data) => {
        saveTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        set({
          isLoggedIn: true,
          userId: data.userId,
          userStatus: data.userStatus,
          nextStep: data.nextStep,
          initialized: true,
          lastLoginAt: Date.now(),
        });
      },
    }),
    {
      name: "cookeep-auth",
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        userId: state.userId,
        userStatus: state.userStatus,
        nextStep: state.nextStep,
      }),
    },
  ),
);
