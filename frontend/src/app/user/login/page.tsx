"use client";
import React from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { Toast } from "../../components/Toast";

const LoginPage = () => {
  const route = useRouter();
  const [toast, setToast] = React.useState<{message:string, status:"success" | "error"}>();

  const accountConfirmationIsSuccess =
      useSearchParams().get('account_confirmation_success') || false;

  React.useEffect(() => {
    if (accountConfirmationIsSuccess) {
      setToast({message:"Account confirmation successful", status:"success"});
    }
  }, [accountConfirmationIsSuccess]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = JSON.stringify(Object.fromEntries(formData));

    fetch("http://localhost:3000/auth/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    }).then((response) => {
      if(response.ok) {
        const authorizationToken = response.headers.get('Authorization');
        if (authorizationToken) {
          setCookie('token', authorizationToken);
          setToast({message:"Login successful", status:"success"});
          route.push('/events');
        }
      } else {
        console.log(response);
        setToast({message:"Login failed", status:"error"});
      }
    }).catch((error) => {
      setToast({message:"Something went wrong", status:"error"});
      console.log(error)
    });
  };

  return (
    <div className="h-screen bg-fuchsia-100 flex items-center justify-center">
      {toast && <Toast message={toast.message} status={toast.status} onClose={() => setToast(undefined)} />}
      <form onSubmit={handleLogin} className="bg-background-50 rounded-md px-10 py-10 shadow-md min-w-1/3">
        <h1 className="text-2xl font-bold mb-8">Log in</h1>
        <div className="flex flex-col gap-4">
          <Input
            name="email"
            label="Email"
            placeholder="youremail@example.com"
          />
          <Input
            name="password"
            label="Password"
            placeholder="********"
            type="password"
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
            href="/user/register"
            className="text-fuchsia-800 leading-5 mt-4"
          >
            Sign up
          </Link>
          <Link href="/user/reset-password" className="text-fuchsia-800 leading-5">
            Forgot your password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
