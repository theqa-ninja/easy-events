import type { Metadata } from "next";
import { NewPasswordForm } from "./NewPasswordForm";

export const metadata: Metadata = {
  title: "New Password",
};

const NewPasswordPage = () => {
  return (
    <NewPasswordForm />
  );

};

export default NewPasswordPage;
