"use client";
import React from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toast } from "../../components/Toast";

const ResetPasswordPage = () => {
  const route = useRouter();
  const [toast, setToast] = React.useState<{
    message: string;
    status: "success" | "error";
  }>();

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const body = JSON.stringify({ email, redirect_url: "http://localhost:3001/user/new-password" });

    fetch("http://localhost:3000/auth/password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => {
        if (response.ok) {
          setToast({
            message: "Reset password instructions sent",
            status: "success",
          });
        } else {
          setToast({ message: "Password reset failed", status: "error" });
        }
      })
      .catch((error) => {
        setToast({ message: "Something went wrong", status: "error" });
        console.log(error);
      });
  };

  return (
    <div className="h-screen bg-fuchsia-100 flex items-center justify-center">
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          onClose={() => setToast(undefined)}
        />
      )}
      <form
        onSubmit={handleResetPassword}
        className="bg-background-50 rounded-md px-10 py-10 shadow-md min-w-1/3 max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Reset password</h1>
        <p>
          Please enter your email below, and we will send you an email with
          instructions on how to reset your password.
        </p>
        <div className="flex flex-col gap-4 my-4">
          <Input
            name="email"
            label="Email"
            placeholder="youremail@example.com"
          />
        </div>
        <div className="my-5">
          <Button
            type="submit"
            alignSelf="start"
            variant="primary"
            label="Send me reset password instructions"
          />
        </div>
        <div className="flex flex-row gap-2 align-end">
          <Link 
            href="/user/login" 
            className="leading-5">
            Log in
          </Link>
          |
          <Link
            href="/user/create-account"
            className="leading-5"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
