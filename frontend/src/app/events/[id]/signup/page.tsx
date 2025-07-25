import React from "react";
import Link from "next/link";
import { getEvent } from "@/app/events/events.service";
import { getSignup, ISignup } from "@/app/events/[id]/signups.service";
import { Event } from "@/app/events/Event";
import { validateToken } from "@/app/utilities";
import { SignupForm } from "./SignupForm";
import { SignupConfirmationOrForm } from "./SignupConfirmationOrForm";
import { getUser } from "@/app/user/users.service";
import { signupsAreClosed } from "../../events.helper";
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

  if (signupsAreClosed(eventData)) {
    return (
      <>
        {eventData && (
          <>
            <h1>Signup for {eventData.title}</h1>
            <Event eventData={eventData} />
          </>
        )}
        <b>Signups are closed for this event.</b>
      </>
    );
  }

  const signupData = await getSignup(id);
  const user = await getUser();
  const signup: ISignup = signupData?.user_name && {
    event_id: Number(id),
    user_id: Number(signupData && signupData?.user_id),
    user_name: signupData?.name || "",
    user_email: signupData?.email || "",
    user_phone_number: signupData?.phone_number || "",
    user_is_over_18: signupData?.is_over_18 || false,
    notes: signupData?.notes || "",
  };

  const loggedIn = await validateToken();

  return (
    <>
      {eventData && (
        <>
          <h1>Signup for {eventData.title}</h1>
          <Event eventData={eventData} />
        </>
      )}
      {!loggedIn && (
        <p className="border border-gray-400 py-3 px-4 rounded-2xl mt-4">
          Would you like to <Link href="/user/login">log in</Link> or{" "}
          <Link href="/user/create-account">create an account</Link> to save
          your info to signup more quickly in the future? Creating an account
          would also allow you to edit your signup.
        </p>
      )}
      {signup && <SignupConfirmationOrForm signup={signup} id={Number(id)} />}
      <SignupForm eventId={Number(id)} user={user} />
    </>
  );
};

export default SignupPage;
