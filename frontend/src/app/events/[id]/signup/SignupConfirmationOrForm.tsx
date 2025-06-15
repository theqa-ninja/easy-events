"use client";
import { ISignup } from "@/app/events/events.service";
import { useRouter } from "next/navigation";

export const SignupConfirmationOrForm = ({
  signup,
  id,
}: {
  signup: ISignup;
  id: number;
}) => {
  const router = useRouter();
  const signedUp = (signup: ISignup) => {
    if (signup?.user_email) {
      router.push(`/events/${id}/signup-confirmation`);
    }
    return false;
  };
  return signedUp(signup);
};
