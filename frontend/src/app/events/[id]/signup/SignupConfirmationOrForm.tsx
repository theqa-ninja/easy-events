"use client";
import { ISignup } from "@/app/events/[id]/signups.service";
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
    if (signup?.email) {
      router.push(`/events/${id}/signup-confirmation`);
    }
    return false;
  };
  return signedUp(signup);
};
