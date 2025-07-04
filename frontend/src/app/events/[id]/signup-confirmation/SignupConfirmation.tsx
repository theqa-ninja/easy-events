"use client";
import { useEffect } from "react";
import Link from "next/link";
import { ISignup } from "@/app/events/[id]/signups.service";
import { useRouter } from "next/navigation";

export const SignupConfirmation = ({
  signup,
  eventId,
}: {
  signup: ISignup;
  eventId: number;
}) => {
  const router = useRouter();

  useEffect(() => {
    if (!signup?.email) {
      router.push(`/events/${eventId}`);
    }
  }, [signup]);

  return signup?.email && (
    <div className="text-left w-full mt-5 p-5 bg-green-100 rounded-2xl transition-colors ease-in duration-300">
      <h2>Signup Confirmation</h2>
      <p>
        Hi <b>{signup?.name}</b>, thank you for signing up.
        Please check your email for confirmation as well as more info about the
        event.
      </p>
      <p>
        Here's your contact info on file:
        <dl>
          <dl>
            <dt>Name:</dt>
            <dd>{signup?.name}</dd>
          </dl>
          <dl>
            <dt>Phone number:</dt>
            <dd>{signup?.phone_number}</dd>
          </dl>
          <dl>
            <dt>Email:</dt>
            <dd>{signup?.email}</dd>
          </dl>
          <dl>
            <dt>You are over 18:</dt>
            <dd>{signup?.is_over_18 ? "Yes" : "No"}</dd>
          </dl>
          <dl>
            <dt>Your notes for us:</dt>
            <dd>{signup?.notes}</dd>
          </dl>
        </dl>
      </p>
      <p>Thanks for volunteering!</p>
      <Link href="/events">Back to events</Link> |{" "}
      <Link href={`/events/${eventId}/signup/edit`}>Edit your signup</Link>
    </div>
  );
};
