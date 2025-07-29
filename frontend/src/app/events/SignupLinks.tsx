"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { hasUserSignedUp, IEvent } from "@/app/events/events.service";
import { signupsAreClosed } from "./events.helper";

export const SignupLinks = ({
  loggedIn,
  event,
}: {
  loggedIn: boolean;
  event: IEvent;
}) => {
  if (signupsAreClosed(event)) {
    return <b>Signups are closed for this event.</b>;
  }

  if (loggedIn === false) {
    return (
      <Link href={`/events/${event.id}/signup`}>Sign up for this event</Link>
    );
  }

  const [signedUp, setSignedUp] = useState(false);
  useEffect(() => {
    hasUserSignedUp(Number(event.id)).then((res) => {
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
        <Link href={`/events/${event.id}/signup`}>Sign up for this event</Link>
      )}
      {signedUp === true && (
        <>
          <Link href={`/events/${event.id}/signup-confirmation`}>
            View your signup confirmation
          </Link>
          <Link href={`/events/${event.id}/signup/edit`}>Edit your signup</Link>
        </>
      )}
    </>
  );
};
