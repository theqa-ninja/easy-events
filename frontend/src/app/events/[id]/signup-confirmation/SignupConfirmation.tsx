"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ISignup } from "../../events.service";
import { findLocalSignup } from "@/app/utilities";

export const SignupConfirmation = ({
  signup,
  eventId,
}: {
  signup: ISignup;
  eventId: number;
}) => {
  const [confirmationSignup, setConfirmationSignup] = useState(signup);
  useEffect(() => {
    if (!signup?.user_email) {
      const localSignup = findLocalSignup(eventId);
      if (localSignup) {
        setConfirmationSignup(localSignup);
      }
    }
  }, [signup]);

  return (
    <div className="text-left w-full mt-5">
      <h2>Signup Confirmation</h2>
      <p>
        Hi <b>{confirmationSignup?.user_name}</b>, thank you for signing up.
        Please check your email for confirmation as well as more info about the
        event.
      </p>
      <p>
        Here's your contact info on file:
        <br />
        {confirmationSignup?.user_email} {confirmationSignup?.user_phone_number}
        <br />
        You are {confirmationSignup?.user_is_over_18 ? "over 18" : "under 18"}
      </p>
      <p>
        Your notes:
        <br />
        {confirmationSignup?.notes}
      </p>
      <p>Thanks for volunteering!</p>
      <Link href="/events">Back to events</Link> |{" "}
      <Link href={`/events/${eventId}/signup/edit`}>Edit your signup</Link>
    </div>
  );
};
