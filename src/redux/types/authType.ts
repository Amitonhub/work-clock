import { LoginForm } from "@/views/LogIn/types";

export type LogIn = {
  isLogin: boolean,
  loading: boolean,
  userInfo: LoginForm | null,
  userToken: string | null,
  error: string | null,
  success: boolean,
};

