import React from "react";
import { getEvent, getSignup, ISignup } from "../../events.service";
import { Event } from "../../components/Event";
import { SignupForm } from "../../components/SignupForm";
import { validateToken } from "@/app/utilities";
import Link from "next/link";

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
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
      return false;
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
      {loggedIn && signedUp(signup) ? (
        <div className="text-left w-full mt-5">
          <h2>Signup Confirmation</h2>
          <p>Hi <b>{signup?.user_name}</b>, thank you for signing up. Please check your email for confirmation as well as more info about the event.</p>
          <p>Here's your contact info on file:<br/>{signup?.user_email} {signup?.user_phone_number}<br/>
          You are {signup?.user_is_over_18 ? "over 18" : "under 18"}</p>
          <p>Your notes:<br/>{signup?.notes}</p>
          <p>Thanks for volunteering!</p>
          <Link href="/events">Back to events</Link> | <Link href={`/events/{id}/signup/edit`}>Edit your signup</Link>
        </div>
      ) : (
        eventData && <SignupForm signup={signup} eventId={Number(id)} />
      )}
    </main>
  );
};

export default EventDetails;
