"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { object, string, ref } from "yup";
import { validateOnBlur } from "@/app/utilities";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { IToast, Toast } from "@/app/components/Toast";
import { newPassword } from "@/app/user/users.service";
import { ColoredBackground } from "@/app/components/ColoredBackground";
import { Card } from "@/app/components/Card";

export const NewPasswordForm = () => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("access-token");
  const client = searchParams.get("client");
  const uid = searchParams.get("uid");
  const [toast, setToast] = React.useState<IToast>();
  const [errors, setErrors] = useState<{ [name: string]: string }>({});

  let resetPasswordSchema = object({
    password: string()
      .required("Password is required")
      .length(8, "Password must be at least 8 characters"),
    password_confirmation: string()
      .required("Password confirmation is required")
      .oneOf([ref("password")], "Passwords must match"),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    validateOnBlur(event, resetPasswordSchema, setErrors);
  };

  const handleNewPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDataEntries = Object.fromEntries(formData);

    try {
      await resetPasswordSchema.validate(formDataEntries, {
        abortEarly: false,
      });
      setErrors({});

      const body = JSON.stringify({
        ...formDataEntries,
        redirect_url: `${process.env.NEXT_PUBLIC_UI_ROUTE}/user/login`,
      });

      newPassword(JSON.parse(body), accessToken, client, uid)
        .then((response) => {
          if (response.ok) {
            setToast({
              message:
                "Your password has been changed, and you may log in with your new password.",
              status: "success",
            });
            setTimeout(() => {
              route.push("/user/login");
            }, 3000);
          } else {
            setToast({ message: "Password reset failed", status: "error" });
          }
        })
        .catch((error) => {
          setToast({ message: "Something went wrong", status: "error" });
          console.log(error);
        });
    } catch (validationError: any) {
      const formattedError = validationError.inner.reduce(
        (acc: any, err: any) => {
          acc[err.path] = err.message;
          return acc;
        },
        {}
      );
      setErrors(formattedError);
    }
  };

  return (
    <ColoredBackground bgColor="bg-background-50">
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          onClose={() => setToast(undefined)}
        />
      )}
      <Card classNames="w-100 p-10">
        <form
          onSubmit={handleNewPassword}
        >
          <h1 className="text-2xl font-bold mb-8">Change my password</h1>
          <div className="flex flex-col gap-4 my-4">
            <Input
              name="password"
              label="password"
              placeholder="********"
              type="password"
              onBlur={handleChange}
              errorMessage={errors.password}
            />
          </div>
          <div className="flex flex-col gap-4 my-4">
            <Input
              name="password_confirmation"
              label="password confirmation"
              placeholder="********"
              type="password"
              onBlur={handleChange}
              errorMessage={errors.password_confirmation}
            />
          </div>
          <div className="my-4">
            <Button
              type="submit"
              alignSelf="start"
              variant="primary"
              label="Change my password"
            />
          </div>
          <div className="flex flex-row gap-2 align-end">
            <Link href="/user/login" className="leading-5">
              Log in
            </Link>
            |
            <Link href="/user/create-account" className="leading-5">
              Sign up
            </Link>
          </div>
        </form>
      </Card>
    </ColoredBackground>
  );
};
