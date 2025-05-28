import type { Metadata } from "next";
import { LoginForm } from "@/app/user/components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
