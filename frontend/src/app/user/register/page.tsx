"use client";
import React from "react";
import { Input } from "../../components/Input";
import { BinaryRadioInput } from "../../components/BinaryRadioInput";
import { Button } from "../../components/Button";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="h-screen bg-fuchsia-100 flex items-center justify-center">
      <div className="bg-slate-50 rounded-md px-10 py-10 shadow-md min-w-1/3">
        <h1 className="text-2xl font-bold mb-8">Create an account</h1>
        <div className="flex flex-col gap-4">
          <Input
            className="rounded-md bg-slate-100 border-1 border-fuchsia-800 p-2"
            name="name"
            label="Name"
            placeholder="Firstname Lastname"
          />
          <Input
            className="rounded-md bg-slate-100 border-1 border-fuchsia-800 p-2"
            name="email"
            label="Email"
            placeholder="youremail@example.com"
          />
          <Input
            className="rounded-md bg-slate-100 border-1 border-fuchsia-800 p-2"
            name="phone-number"
            label="Phone number"
            placeholder="5555555555"
          />
          <BinaryRadioInput
            className="rounded-md bg-slate-100 border-1 border-fuchsia-800 p-2"
            name="over-18"
            idA="yes"
            idB="no"
            labelA="Yes"
            labelB="No"
            question="Are you over 18?"
          />
          <Input
            className="rounded-md bg-slate-100 border-1 border-fuchsia-800 p-2"
            name="password"
            label="Password"
            placeholder="********"
          />
          <Input
            className="rounded-md bg-slate-100 border-1 border-fuchsia-800 p-2"
            name="password-confirmation"
            label="Password confirmation"
            placeholder="********"
          />
        </div>
        <div className="my-4">
          <Button
            alignSelf="start"
            backgroundColor="rgb(143, 57, 177)"
            label="Sign up"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/user/login" className="text-fuchsia-800 leading-5">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
