"use client";
import React, { useState } from "react";
import Link from "next/link";
import { object, string } from "yup";
import { passwordReset } from "@/app/user/users.service";
import { validateOnBlur } from "@/app/utilities";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { IToast, Toast } from "@/app/components/Toast";
import { ColoredBackground } from "@/app/components/ColoredBackground";

export const ResetPasswordForm = () => {
  const [toast, setToast] = useState<IToast>();
  const [errors, setErrors] = useState<{ [name: string]: string }>({});

  let resetPasswordSchema = object({
    email: string().email("Invalid email").required("Email is required"),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    validateOnBlur(event, resetPasswordSchema, setErrors);
  };

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const body = JSON.stringify({ email: email, redirect_url: `${process.env.NEXT_PUBLIC_UI_ROUTE}/user/new-password` });

    passwordReset(JSON.parse(body))
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
    <ColoredBackground bgColor="bg-rose-50">
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          onClose={() => setToast(undefined)}
        />
      )}
      <form
        onSubmit={handleResetPassword}
        className="bg-white rounded-md px-10 py-10 shadow-md min-w-1/3 max-w-sm"
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
            type="email"
            errorMessage={errors.email}
            onBlur={handleChange}
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
    </ColoredBackground>
  );
};
