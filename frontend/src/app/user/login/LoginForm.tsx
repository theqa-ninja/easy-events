"use client";
import React, { useState } from "react";
import { setCookie } from "cookies-next";
import { object, string } from "yup";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { validateOnBlur } from "@/app/utilities";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { IToast, Toast } from "@/app/components/Toast";
import { signInUser } from "@/app/user/users.service";
import { ColoredBackground } from "@/app/components/ColoredBackground";
import { Card } from "@/app/components/Card";

export const LoginForm = () => {
  const route = useRouter();
  const [toast, setToast] = useState<IToast>();
  const [errors, setErrors] = useState<{ [name: string]: string }>({});

  let loginSchema = object({
    email: string().email("Invalid email").required("Email is required"),
    password: string().required("Password is required"),
  });

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    validateOnBlur(event, loginSchema, setErrors);
  };

  const searchParam = useSearchParams();

  const accountConfirmationIsSuccess =
    searchParam.get("account_confirmation_success") || false;

  React.useEffect(() => {
    if (accountConfirmationIsSuccess) {
      setToast({
        message: "Account confirmation successful",
        status: "success",
      });
    }
  }, [accountConfirmationIsSuccess]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDataEntries = Object.fromEntries(formData);

    try {
      await loginSchema.validate(formDataEntries, { abortEarly: false });
      setErrors({});
      const body = JSON.stringify(formDataEntries);

      signInUser(JSON.parse(body))
        .then((response) => {
          if (response.ok) {
            const authorizationToken = response.headers.get("Authorization");
            if (authorizationToken) {
              setCookie("token", authorizationToken);
              setToast({ message: "Login successful", status: "success" });
              route.push("/events");
            }
          } else {
            console.log(response);
            setToast({ message: "Login failed", status: "error" });
          }
        })
        .catch((error) => {
          setToast({ message: "Something went wrong", status: "error" });
          console.log(error);
        });
    } catch (validationErrors: any) {
      const formattedErrors = validationErrors.inner.reduce(
        (acc: any, err: any) => {
          acc[err.path] = err.message;
          return acc;
        },
        {}
      );
      setErrors(formattedErrors);
    }
  };

  return (
    <ColoredBackground bgColor="bg-backdrop">
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          onClose={() => setToast(undefined)}
        />
      )}
      <Card classNames="max-w-100 p-10">
        <form onSubmit={handleLogin}>
          <h1 className="text-2xl font-bold mb-8">Log in</h1>
          <div className="flex flex-col gap-4">
            <Input
              name="email"
              label="Email"
              placeholder="youremail@example.com"
              errorMessage={errors.email}
              onBlur={handleChange}
            />
            <Input
              name="password"
              label="Password"
              placeholder="********"
              type="password"
              errorMessage={errors.password}
              onBlur={handleChange}
            />
            <Input name="remember_me" label="Remember me" type="checkbox" />
          </div>
          <div className="my-4">
            <Button
              type="submit"
              alignSelf="start"
              variant="primary"
              label="Log in"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href="/user/create-account"
              className="text-fuchsia-800 leading-5 mt-4"
            >
              Sign up
            </Link>
            <Link
              href="/user/reset-password"
              className="text-fuchsia-800 leading-5"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </Card>
    </ColoredBackground>
  );
};
