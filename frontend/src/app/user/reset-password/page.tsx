import type { Metadata } from "next";
import { ResetPasswordForm } from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
};

const ResetPasswordPage = () => {
  return (
    <ResetPasswordForm />
  )
};

export default ResetPasswordPage;
