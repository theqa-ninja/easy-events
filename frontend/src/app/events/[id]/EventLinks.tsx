import { doesUserHavePermissions } from "@/app/user/users.service";
import Link from "next/link";

export const EventLinks = async ({ eventId }: { eventId: number }) => {
  const userMayEditEvents = await doesUserHavePermissions([
    "Superadmin",
    "Admin",
    "Event Coordinator",
  ]);
  return (
    userMayEditEvents && (
      <div className="flex gap-4 mt-5">
        <Link href={`/events/${eventId}/edit`}>Edit this event</Link>
        <Link href={`/events/${eventId}/signups`}>View signups</Link>
        <Link href={`/events/${eventId}/check-ins`}>View check-ins</Link>
      </div>
    )
  );
};
