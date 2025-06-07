"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { hasUserSignedUp, ISignup } from "@/app/events/events.service";

export const SignupLinks = ({ eventId }: { eventId: number }) => {
  const [signedUp, setSignedUp] = useState(false);
  const findLocalSignup = () => {
    if (localStorage.getItem("signups")) {
      const storedSignups = localStorage.getItem("signups");
      const parsedSignups = JSON.parse(storedSignups || "");
      const localSignup = parsedSignups.find(
        (signup: ISignup) => signup.event_id === eventId
      );
      return localSignup;
    }
  };
  useEffect(() => {
    hasUserSignedUp(eventId).then((res) => {
      if (res === true) {
        setSignedUp(true);
        return;
      } else {
        const localSignup = findLocalSignup();
        if (localSignup) {
          setSignedUp(true);
          return;
        }
      }
      setSignedUp(false);
    });
  }, [signedUp]);

  return (
    <>
      {signedUp === false && (
        <Link href={`events/${eventId}/signup`}>Sign up for this event</Link>
      )}
      {signedUp === true && (
        <>
        <Link href={`events/${eventId}/signup`}>View your signup confirmation</Link>
        <Link href={`events/${eventId}/signup/edit`}>Edit your signup</Link>
        </>
      )}
    </>
  );
};
