"use client";
import { useState } from "react";
import { createSignup, ISignup } from "../events.service";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { BinaryRadioInput } from "@/app/components/BinaryRadioInput";
import { Button } from "@/app/components/Button";

export const SignupForm = ({
  signup,
  eventId,
}: {
  signup: ISignup;
  eventId: number;
}) => {
  const [message, setMessage] = useState("");
  const submitSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = JSON.stringify(Object.fromEntries(formData));
    createSignup(eventId, JSON.parse(body))
      .then(() => {
        setMessage("Signup successful");
      })
      .catch(() => {
        setMessage("Signup failed");
      });
    // TODO: show success or error message in Toast
  };
  return (
    <form onSubmit={submitSignup} className="flex flex-col gap-4 w-100">
      <Input
        type="text"
        name="user_name"
        placeholder="Name"
        defaultValue={signup.user_name}
      />
      <Input
        type="email"
        name="user_email"
        placeholder="Email"
        defaultValue={signup.user_email}
      />
      <Input
        type="tel"
        name="user_phone_number"
        placeholder="Phone number"
        defaultValue={signup.user_phone_number}
      />
      <BinaryRadioInput
        name="user_is_over_18"
        idA="yes"
        idB="no"
        labelA="Yes"
        labelB="No"
        valueA="true"
        valueB="false"
        question="Are you over 18 years old?"
      />
      <Textarea
        name="notes"
        placeholder="notes..."
        defaultValue={signup.notes}
      />

      <Button type="submit" label="Sign up" />
    </form>
  );
};
