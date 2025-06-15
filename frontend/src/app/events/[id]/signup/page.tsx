import React from "react";
import Link from "next/link";
import { getEvent, getSignup, ISignup } from "@/app/events/events.service";
import { Event } from "@/app/events/Event";
import { validateToken } from "@/app/utilities";
import { SignupForm } from "./SignupForm";
import { SignupConfirmationOrForm } from "./SignupConfirmationOrForm";
import { redirect } from "next/navigation";
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const eventData = await getEvent(id);

  return {
    title: `Signup for ${eventData?.title}`,
  };
};

const SignupPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const eventData = await getEvent(id);
  const signupData = await getSignup(id);
  const signup: ISignup = {
    event_id: Number(id),
    user_id: Number(signupData && signupData?.user_id),
    user_name: signupData?.user_name || "",
    user_email: signupData?.user_email || "",
    user_phone_number: signupData?.user_phone_number || "",
    user_is_over_18: signupData?.user_is_over_18 || false,
    notes: signupData?.notes || "",
  };
  const loggedIn = await validateToken();

  return (
    <main className="flex flex-col items-center justify-between p-4 max-w-4xl m-auto">
      {eventData && <Event eventData={eventData} />}
      {!loggedIn && (
        <p className="border border-gray-400 p-4 rounded-2xl mt-4">
          Would you like to <Link href="/user/login">log in</Link> or{" "}
          <Link href="/user/create-account">create an account</Link> to save
          your info to signup more quickly in the future? Creating an account
          would also allow you to edit your signup.
        </p>
      )}
      {<SignupConfirmationOrForm signup={signup} id={Number(id)} />}
      <SignupForm eventId={Number(id)} signupData={signup} />
    </main>
  );
};

export default SignupPage;
