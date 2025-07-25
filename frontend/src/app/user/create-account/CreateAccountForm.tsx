"use client";
import React, { useState } from "react";
import { object, string, ref } from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateOnBlur } from "@/app/utilities";
import { Input } from "@/app/components/Input";
import { BinaryRadioInput } from "@/app/components/BinaryRadioInput";
import { Button } from "@/app/components/Button";
import { IToast, Toast } from "@/app/components/Toast";
import { createUserAccount } from "../users.service";
import { Card } from "@/app/components/Card";

export const CreateAccountForm = () => {
  const route = useRouter();
  const [toast, setToast] = useState<IToast>();
  const [errors, setErrors] = useState<{ [name: string]: string }>({});

  let createAccountSchema = object({
    email: string().email("Invalid email").required("Email is required"),
    password: string()
      .required("Password is required")
      .length(8, "Password must be at least 8 characters"),
    password_confirmation: string()
      .required("Password confirmation is required")
      .oneOf([ref("password")], "Passwords must match"),
    name: string().required("Name is required"),
    is_over_18: string().required("Age is required"),
  });

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    validateOnBlur(event, createAccountSchema, setErrors);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDataEntries = Object.fromEntries(formData);
    try {
      await createAccountSchema.validate(formDataEntries, {
        abortEarly: false,
      });
      setErrors({});
      const body = JSON.stringify(formDataEntries);

      createUserAccount(JSON.parse(body))
        .then(async (response) => {
          if (response.ok) {
            setToast({ message: "Registration successful", status: "success" });
            setTimeout(() => {
              route.push("/user/login");
            }, 3000);
          } else {
            const errorData = await response.json();
            const message = errorData.errors.full_messages.join(", ");
            throw new Error(message || "Signup failed");
          }
        })
        .catch((error) => {
          setToast({ message: error.message, status: "error" });
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
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-rose-100 flex items-center justify-center">
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          onClose={() => setToast(undefined)}
        />
      )}
      <Card classNames="w-100 p-10">
        <form onSubmit={handleRegister}>
          <h1 className="text-2xl font-bold mb-8">Create an account</h1>
          <div className="flex flex-col gap-4">
            <Input
              name="name"
              label="Name"
              placeholder="First name Last name"
              onBlur={handleChange}
              errorMessage={errors.name}
            />
            <Input
              name="email"
              label="Email"
              placeholder="youremail@example.com"
              type="email"
              onBlur={handleChange}
              errorMessage={errors.email}
            />
            <Input
              name="phone_number"
              label="Phone number"
              placeholder="5555555555"
            />
            <BinaryRadioInput
              name="is_over_18"
              idA="yes"
              idB="no"
              labelA="Yes"
              labelB="No"
              question="Are you over 18?"
              onBlur={handleChange}
              errorMessage={errors.is_over_18}
            />
            <Input
              name="password"
              label="Password"
              placeholder="********"
              type="password"
              onBlur={handleChange}
              errorMessage={errors.password}
            />
            <Input
              name="password_confirmation"
              label="Password confirmation"
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
              label="Sign up"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/user/login" className="text-fuchsia-800 leading-5">
              Already have an account? Log in
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};
