import api from "./axios";

// 로그인 부분
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  status: string;
  timestamp: string;
  data: {
    userId: number;
    accessToken: string;
    refreshToken: string;
    userStatus: "CREATED" | "ACTIVE";
    isRewarded: boolean;
  };
}

export const loginApi = async (payload: LoginRequest) => {
  const res = await api.post<LoginResponse>("/api/auth/login", payload);

  // 우리가 필요한 건 data 안의 data
  return res.data.data;
};

// 회원가입부분
export interface SignupRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  marketingConsent: boolean;
}

export const signup = async (payload: SignupRequest) => {
  const res = await api.post("/api/auth/signup", payload);
  return res.data;
};

// 회원가입 - 인증번호 발송
export const sendSignupCodeApi = async (email: string) => {
  const res = await api.post("/api/auth/signup/send-code", {
    email,
  });

  return res.data;
};

// 회원가입 - 인증번호 확인
export const verifySignupCodeApi = async (email: string, code: string) => {
  const res = await api.post("/api/auth/signup/verify-code", {
    email,
    code,
  });

  return res.data;
};

// 비밀번호 찾기 - 인증번호 발송
export const sendPasswordCodeApi = async (email: string) => {
  const res = await api.post("/api/auth/password/send-code", {
    email,
  });

  return res.data;
};

// 인증번호 확인
export const verifyPasswordCodeApi = async (email: string, code: string) => {
  const res = await api.post("/api/auth/password/verify-code", {
    email,
    code,
  });

  return res.data;
};

// 비밀번호 재설정
export const resetPasswordApi = async (
  email: string,
  password: string,
  passwordConfirm: string,
) => {
  const res = await api.patch("/api/auth/password/reset", {
    email,
    password,
    passwordConfirm,
  });

  return res.data;
};

// 로그아웃
export const logoutApi = async () => {
  const res = await api.post("/api/auth/logout");
  return res.data;
};

// 회원 탈퇴 API
export const withdrawUser = async () => {
  const res = await api.delete<{
    status: string;
    timestamp: string;
    data: string;
  }>("/api/auth/withdraw");

  return res.data;
};
