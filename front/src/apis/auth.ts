import api from ".";

interface LoginForm {
  email: string;
  password: string;
}

interface SignupForm {
  email: string;
  nickname: string;
  password: string;
}

interface AuthResponse {
  email: string;
  nickname: string;
}

export const login = async (form: LoginForm): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/users/login", form);
  return response.data;
};

export const signup = async (form: SignupForm): Promise<AuthResponse> => {
  const response = await api.post("/users", form);
  if (response.status >= 200 && response.status < 300) {
    return { email: form.email, nickname: form.nickname };
  }
  throw new Error("회원가입 실패");
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>("/auth/me");
  return response.data;
};
