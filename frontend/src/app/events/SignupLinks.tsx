"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { hasUserSignedUp, IEvent } from "@/app/events/events.service";

export const SignupLinks = ({
  loggedIn,
  event,
}: {
  loggedIn: boolean;
  event: IEvent;
}) => {
  const isEventClosed = event.close_time
    ? event.close_time < new Date().toISOString()
    : event.end_time < new Date().toISOString();

  if (isEventClosed) {
    return <b>Signups are closed for this event.</b>;
  }

  if (loggedIn === false) {
    return (
      <Link href={`events/${event.id}/signup`}>Sign up for this event</Link>
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
        <Link href={`events/${event.id}/signup`}>Sign up for this event</Link>
      )}
      {signedUp === true && (
        <>
          <Link href={`events/${event.id}/signup-confirmation`}>
            View your signup confirmation
          </Link>
          <Link href={`events/${event.id}/signup/edit`}>Edit your signup</Link>
        </>
      )}
    </>
  );
};
