import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as loginAPI, signup as signupAPI } from "../apis/auth";

interface User {
  id: number;
  email: string;
  nickname: string;
}

interface SignupForm {
  email: string;
  nickname: string;
  password: string;
}

interface LoginForm {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
  signup: (form: SignupForm) => Promise<void>;
  login: (form: LoginForm) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearAuth: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updatedUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        })),
      signup: async (form) => {
        set({ loading: true, error: null });
        try {
          const user = await signupAPI(form);
          set({ user, isAuthenticated: true, loading: false });
        } catch (err: any) {
          const errorMessage =
            typeof err.response?.data === "string"
              ? err.response.data
              : err.response?.data?.message || "회원가입에 실패했습니다.";
          set({
            error: errorMessage,
            loading: false,
          });
          throw err;
        }
      },
      login: async (form) => {
        set({ loading: true, error: null });
        try {
          const user = await loginAPI(form);
          set({ user, isAuthenticated: true, loading: false });
        } catch (err: any) {
          const errorMessage =
            typeof err.response?.data === "string"
              ? err.response.data
              : err.response?.data?.message || "로그인에 실패했습니다.";
          set({
            error: errorMessage,
            loading: false,
          });
          throw err;
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
