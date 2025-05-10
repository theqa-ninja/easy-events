"use client";
import React from "react";
import { Input } from "../../components/Input";
import { BinaryRadioInput } from "../../components/BinaryRadioInput";
import { Button } from "../../components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toast } from "../../components/Toast";

const RegisterPage = () => {
  const route = useRouter();
  const [toast, setToast] = React.useState<{message:string, status:"success" | "error"}>();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = JSON.stringify(Object.fromEntries(formData));

    fetch("http://localhost:3000/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    }).then((response) => {
      if(response.ok) {
        setToast({message:"Registration successful", status:"success"});
        setTimeout(() => {
          route.push('/user/login');
        }, 3000);
      } else {
        setToast({message:"Registration failed", status:"error"});
      }
    }).catch((error) => console.log(error));
  };
  return (
    <div className="h-screen bg-fuchsia-100 flex items-center justify-center">
      {toast && <Toast message={toast.message} status={toast.status} onClose={() => setToast(undefined)} />}
      <form onSubmit={handleRegister} className="bg-slate-50 rounded-md px-10 py-10 shadow-md min-w-1/3">
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
            type="email"
          />
          <Input
            className="rounded-md bg-slate-100 border-1 border-fuchsia-800 p-2"
            name="phone_number"
            label="Phone number"
            placeholder="5555555555"
          />
          <BinaryRadioInput
            className="rounded-md bg-slate-100 border-1 border-fuchsia-800 p-2"
            name="is_over_18"
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
            type="password"
          />
          <Input
            className="rounded-md bg-slate-100 border-1 border-fuchsia-800 p-2"
            name="password_confirmation"
            label="Password confirmation"
            placeholder="********"
            type="password"
          />
        </div>
        <div className="my-4">
          <Button
            type="submit"
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
      </form>
    </div>
  );
};

export default RegisterPage;
