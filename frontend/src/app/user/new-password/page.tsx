"use client";
import React from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Toast } from "../../components/Toast";

const NewPasswordPage = () => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("access-token");
  const client = searchParams.get("client");
  const uid = searchParams.get("uid");
  const [toast, setToast] = React.useState<{
    message: string;
    status: "success" | "error";
  }>();

  const handleNewPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const passwordConfirmation = formData.get("password_confirmation");
    const body = JSON.stringify({ 
      password, password_confirmation: passwordConfirmation, 
      redirect_url: "http://localhost:3001/user/login"
    });

    fetch("http://localhost:3000/auth/password/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken || "",
        client: client || "",
        uid: uid || "",
      },
      body: body,
    })
      .then((response) => {
        if (response.ok) {
          setToast({
            message: "Your password has been changed, and you may log in with your new password.",
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
        onSubmit={handleNewPassword}
        className="bg-background-50 rounded-md px-10 py-10 shadow-md min-w-1/3 max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-8">Change my password</h1>
        <div className="flex flex-col gap-4 my-4">
          <Input
            name="password"
            label="password"
            placeholder="********"
            type="password"
          />
        </div>
        <div className="flex flex-col gap-4 my-4">
          <Input
            name="password_confirmation"
            label="password confirmation"
            placeholder="********"
            type="password"
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
          <Link 
            href="/user/login" 
            className="leading-5">
            Log in
          </Link>
          |
          <Link
            href="/user/register"
            className="leading-5"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewPasswordPage;
