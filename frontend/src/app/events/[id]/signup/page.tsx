import React from "react";
import Link from "next/link";
import { getEvent, getSignup, ISignup } from "@/app/events/events.service";
import { Event } from "@/app/events/components/Event";
import { SignupForm } from "@/app/events/components/SignupForm";
import { SignupConfirmation } from "@/app/events/components/SignupConfirmation";
import { validateToken } from "@/app/utilities";
import { IUser } from "@/app/user/users.service";

const SignupPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const eventData = await getEvent(id);
  const signupData = await getSignup(id);
  const signup: ISignup = {
    event_id: Number(id),
    user_id: Number(signupData && signupData?.user_id),
    user_name: (signupData && signupData?.user_name) || "",
    user_email: (signupData && signupData?.user_email) || "",
    user_phone_number: (signupData && signupData?.user_phone_number) || "",
    user_is_over_18: (signupData && signupData?.user_is_over_18) || false,
    notes: (signupData && signupData?.notes) || "",
  };

  const loggedIn = await validateToken();

  const signedUp = (signup: ISignup) => {
    if (signup.user_email) {
      return true;
    } else {
      return signupData as IUser;
    }
  };

  return (
    <main className="flex flex-col items-center justify-between p-4 max-w-4xl m-auto">
      {eventData && <Event eventData={eventData} />}
      {!loggedIn && (
        <p>
          Would you like to <Link href="/user/login">log in</Link> or{" "}
          <Link href="/user/create-account">create an account</Link> to save
          your account to signup more quickly in the future?
        </p>
      )}
      {signedUp(signup) === true ? (
        <SignupConfirmation signup={signup} eventId={Number(id)} />
      ) : (
        eventData && <SignupForm user={signupData} eventId={Number(id)} />
      )}
    </main>
  );
};

export default SignupPage;
