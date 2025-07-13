"use client";
import { useEffect } from "react";
import Link from "next/link";
import { ISignup } from "@/app/events/[id]/signups.service";
import { useRouter } from "next/navigation";

export const SignupConfirmation = ({
  signup,
  eventId,
}: {
  signup: ISignup[];
  eventId: number;
}) => {
  const router = useRouter();

  useEffect(() => {
    console.log("SignupConfirmation", signup);
    if (signup && signup.length === 1) {
      if (!signup[0]?.email) {
        router.push(`/events/${eventId}`);
      }
    }
  }, [signup]);

  return (
    signup &&
    signup.length > 0 &&
    signup[0]?.email && (
      <div className="text-left w-full mt-5 p-5 bg-green-100 dark:bg-green-950 rounded-2xl transition-colors ease-in duration-300">
        <h2>Signup Confirmation</h2>
        <p>
          Hi <b>{signup[0]?.email}</b>, thank you for signing up. Please check
          your email for confirmation as well as more info about the event.
        </p>
        <p>Here's your contact info on file:</p>
        <dl className="border-l-3 border-slate-300 pl-2">
          <dl>
            <dt>Name:</dt>
            <dd>{signup[0]?.name}</dd>
          </dl>
          <dl>
            <dt>Phone number:</dt>
            <dd>{signup[0]?.phone_number}</dd>
          </dl>
          <dl>
            <dt>Email:</dt>
            <dd>{signup[0]?.email}</dd>
          </dl>
          <dl>
            <dt>You are over 18:</dt>
            <dd>{signup[0]?.is_over_18 ? "Yes" : "No"}</dd>
          </dl>
          <dl>
            <dt className="!block">Your notes for us:</dt>
            <dd className="!ml-0">{signup[0]?.notes}</dd>
          </dl>
        </dl>
        {signup.length > 1 && (
          <>
            <h3 className="mt-5">Additional volunteers:</h3>
            {signup.map(
              (signup, i) =>
                i > 0 && (
                  <dl key={signup.id} className="mb-2 border-l-3 border-slate-300 pl-2">
                    <dl>
                      <dt>Name:</dt>
                      <dd>{signup.name}</dd>
                    </dl>
                    <dl>
                      <dt>They are over 18:</dt>
                      <dd>{signup.is_over_18 ? "Yes" : "No"}</dd>
                    </dl>
                  </dl>
                )
            )}
          </>
        )}
        <p>Thanks for volunteering!</p>
        <Link href="/events">Back to events</Link> |{" "}
        <Link href={`/events/${eventId}/signup/edit`}>Edit your signup</Link>
      </div>
    )
  );
};
