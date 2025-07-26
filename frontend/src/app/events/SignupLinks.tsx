"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { hasUserSignedUp } from "@/app/events/events.service";

export const SignupLinks = ({ loggedIn, eventId }: { loggedIn: boolean, eventId: number }) => {
  if (loggedIn === false) {
    return <Link href={`events/${eventId}/signup`}>Sign up for this event</Link>;
  }

  const [signedUp, setSignedUp] = useState(false);
  useEffect(() => {
    hasUserSignedUp(eventId).then((res) => {
      if (res === true) {
        setSignedUp(true);
        return;
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
        <Link href={`events/${eventId}/signup-confirmation`}>View your signup confirmation</Link>
        <Link href={`events/${eventId}/signup/edit`}>Edit your signup</Link>
        </>
      )}
    </>
  );
};
