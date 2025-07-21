"use client";
import { useEffect } from "react";
import Link from "next/link";
import { ISignup } from "@/app/events/[id]/signups.service";
import { useRouter } from "next/navigation";

export const SignupConfirmation = ({
  primarySignup,
  additionalSignups,
  eventId,
}: {
  primarySignup?: ISignup;
  additionalSignups?: ISignup[];
  eventId: number;
}) => {
  const router = useRouter();

  useEffect(() => {
    if (primarySignup) {
      if (!primarySignup?.email) {
        router.push(`/events/${eventId}`);
      }
    }
  }, [primarySignup]);

  return (
    primarySignup &&
    primarySignup.email && (
      <div className="text-left w-full mt-5 p-5 bg-green-100 dark:bg-green-950 rounded-2xl transition-colors ease-in duration-300">
        <h2>Signup Confirmation</h2>
        <p>
          Hi <b>{primarySignup?.email}</b>, thank you for signing up. Please
          check your email for confirmation as well as more info about the
          event.
        </p>
        <p>Here's your contact info on file:</p>
        <dl className="border-l-3 border-slate-300 pl-2">
          <dl>
            <dt>Name:</dt>
            <dd>{primarySignup?.name}</dd>
          </dl>
          <dl>
            <dt>Phone number:</dt>
            <dd>{primarySignup?.phone_number}</dd>
          </dl>
          <dl>
            <dt>Email:</dt>
            <dd>{primarySignup?.email}</dd>
          </dl>
          <dl>
            <dt>You are over 18:</dt>
            <dd>{primarySignup?.is_over_18 ? "Yes" : "No"}</dd>
          </dl>
          <dl>
            <dt className="!block">Your notes for us:</dt>
            <dd className="!ml-0">{primarySignup?.notes}</dd>
          </dl>
        </dl>
        {additionalSignups && additionalSignups.length > 0 && (
          <>
            <h3 className="mt-5">Additional volunteers:</h3>
            {additionalSignups.map((signup) => (
              <dl
                key={`signup-${signup.id}`}
                className="mb-2 border-l-3 border-slate-300 pl-2"
              >
                <dl>
                  <dt>Name:</dt>
                  <dd>{signup.name}</dd>
                </dl>
                <dl>
                  <dt>They are over 18:</dt>
                  <dd>{signup.is_over_18 ? "Yes" : "No"}</dd>
                </dl>
              </dl>
            ))}
          </>
        )}
        <p>Thanks for volunteering!</p>
        <Link href="/events">Back to events</Link> |{" "}
        <Link href={`/events/${eventId}/signup/edit`}>Edit your signup</Link>
      </div>
    )
  );
};
