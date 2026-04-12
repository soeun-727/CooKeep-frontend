import api from "./axios";

// 로그인 부분
interface LoginRequest {
  phoneNumber: string;
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
  };
}

export const loginApi = async (payload: LoginRequest) => {
  const res = await api.post<LoginResponse>("/api/auth/login", payload);

  // 우리가 필요한 건 data 안의 data
  return res.data.data;
};

// 회원가입부분
export interface SignupRequest {
  phoneNumber: string;
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
export const sendSignupCodeApi = async (phoneNumber: string) => {
  const res = await api.post("/api/auth/signup/send-code", {
    phoneNumber,
  });

  return res.data;
};

// 회원가입 - 인증번호 확인
export const verifySignupCodeApi = async (
  phoneNumber: string,
  code: string,
) => {
  const res = await api.post("/api/auth/signup/verify-code", {
    phoneNumber,
    code,
  });

  return res.data;
};

// 비밀번호 찾기 - 인증번호 발송
export const sendPasswordCodeApi = async (phoneNumber: string) => {
  const res = await api.post("/api/auth/password/send-code", {
    phoneNumber,
  });

  return res.data;
};

// 인증번호 확인
export const verifyPasswordCodeApi = async (
  phoneNumber: string,
  code: string,
) => {
  const res = await api.post("/api/auth/password/verify-code", {
    phoneNumber,
    code,
  });

  return res.data;
};

// 비밀번호 재설정
export const resetPasswordApi = async (
  phoneNumber: string,
  password: string,
  passwordConfirm: string,
) => {
  const res = await api.patch("/api/auth/password/reset", {
    phoneNumber,
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
