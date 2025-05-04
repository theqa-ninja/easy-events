"use client";
import React from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="h-screen bg-fuchsia-100 flex items-center justify-center">
      <div className="bg-slate-50 rounded-md px-10 py-10 shadow-md w-1/3 h-1/2">
        <h1 className="text-2xl font-bold mb-8">Create an account</h1>
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
          />
          <Input name="remember-me" label="Remember me" type="checkbox" />
        </div>
        <div className="my-4">
          <Button
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
      </div>
    </div>
  );
};

export default RegisterPage;
