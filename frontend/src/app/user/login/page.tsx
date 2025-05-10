"use client";
import React from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
  const route = useRouter();
  const accountConfirmationIsSuccess =
      useSearchParams().get('account_confirmation_success') || false;

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    fetch("http://localhost:3000/auth/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      if(response.ok) {
        const authorizationToken = response.headers.get('Authorization');
        if (authorizationToken) {
          setCookie('token', authorizationToken);
          route.push('/');
        }
      }
    }).catch((error) => console.log(error));
  };
  return (
    <div className="h-screen bg-fuchsia-100 flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-slate-50 rounded-md px-10 py-10 shadow-md min-w-1/3">
        <h1 className="text-2xl font-bold mb-8">Log in</h1>
        <div className="flex flex-col gap-4">
          <Input
            className="rounded-md bg-slate-100 border-1 border-fuchsia-800 p-2"
            name="email"
            label="Email"
            placeholder="youremail@example.com"
          />
          <Input
            className="rounded-md bg-slate-100 border-1 border-fuchsia-800 p-2"
            name="password"
            label="Password"
            placeholder="********"
            type="password"
          />
          <Input name="remember-me" label="Remember me" type="checkbox" />
        </div>
        <div className="my-4">
          <Button
            type="submit"
            alignSelf="start"
            backgroundColor="rgb(143, 57, 177)"
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
          <Link href="/password/new" className="text-fuchsia-800 leading-5">
            Forgot your password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
