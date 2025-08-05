"use client";
import Link from "next/link";
import { IEvent } from "@/app/events/events.service";
import { signupsAreClosed } from "./events.helper";

export const SignupLinks = ({
  loggedIn,
  event,
  userSignedUp,
}: {
  loggedIn: boolean;
  event: IEvent;
  userSignedUp: boolean;
}) => {
  if (signupsAreClosed(event)) {
    return <b className="text-secondary">Signups are closed for this event.</b>;
  }

  if (loggedIn === false) {
    return (
      <Link href={`/events/${event.id}/signup`}>Sign up for this event</Link>
    );
  }

  return (
    <>
      {userSignedUp === false && (
        <Link href={`/events/${event.id}/signup`}>Sign up for this event</Link>
      )}
      {userSignedUp === true && (
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
