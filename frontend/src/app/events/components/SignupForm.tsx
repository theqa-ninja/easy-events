"use client";
import { useState } from "react";
import { createSignup, ISignup } from "../events.service";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { BinaryRadioInput } from "@/app/components/BinaryRadioInput";
import { Button } from "@/app/components/Button";
import { Toast } from "@/app/components/Toast";
import { object, string } from "yup";
import { validateOnBlur } from "@/app/utilities";

export const SignupForm = ({
  signup,
  eventId,
}: {
  signup: ISignup;
  eventId: number;
}) => {
  const [toast, setToast] = useState<{
    message: string;
    status: "success" | "error";
  }>();

  const [errors, setErrors] = useState<{ [name: string]: string }>({});
  const signupSchema = object({
    name: string().required("Name is required"),
    email: string().email("Invalid email").required("Email is required"),
    is_over_18: string().required("Age is required"),
  });

  const errorKeyValuePairs = [
    { name: 'user_name', value: "User's name"},
    { name: 'user_email', value: "User's email"},
  ]

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    validateOnBlur(event, signupSchema, setErrors);
  };

  const submitSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = JSON.stringify(Object.fromEntries(formData));

    try {
      signupSchema.validateSync(Object.fromEntries(formData), {
        abortEarly: false,
      });
      setErrors({});
      createSignup(eventId, JSON.parse(body))
      .then(async (response) => {
        if (!response.id) {
          const errorData:any = await response;
          const message = Object.keys(errorData).map((key) => 
            errorKeyValuePairs.find((pair) => pair.name === key)?.value || "" + " " + errorData[key]);
          throw new Error(message.join() || "Signup failed");
        }
        setToast({ message: "Signup successful", status: "success" });
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
    <>
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          onClose={() => setToast(undefined)}
        />
      )}
      <form onSubmit={submitSignup} className="flex flex-col gap-4 w-100">
        <Input
          type="text"
          name="name"
          placeholder="Name"
          defaultValue={signup.user_name}
          onBlur={handleChange}
          errorMessage={errors.name}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          defaultValue={signup.user_email}
          onBlur={handleChange}
          errorMessage={errors.email}
        />
        <Input
          type="tel"
          name="phone_number"
          placeholder="Phone number"
          defaultValue={signup.user_phone_number}
        />
        <BinaryRadioInput
          name="is_over_18"
          idA="yes"
          idB="no"
          labelA="Yes"
          labelB="No"
          valueA="true"
          valueB="false"
          question="Are you over 18 years old?"
          onBlur={handleChange}
          errorMessage={errors.is_over_18}
        />
        <Textarea
          name="notes"
          placeholder="notes..."
          defaultValue={signup.notes}
        />

        <Button type="submit" label="Sign up" />
      </form>
    </>
  );
};
