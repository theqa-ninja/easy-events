import { doesUserHavePermissions } from "@/app/user/users.service";
import Link from "next/link";

export const EventLinks = async ({ eventId, teamId }: { eventId: number, teamId: number }) => {
  const userMayEditEvents = await doesUserHavePermissions({
    actionAndPage: "EDIT_EVENT",
    teamId: teamId,
  });

  return (
    <>
      {userMayEditEvents && (
        <div className="flex gap-4 mt-5">
          <Link href={`/events/${eventId}/edit`}>
            Edit or delete this event
          </Link>
          <Link href={`/events/${eventId}/clone`}>Clone event</Link>
          <Link href={`/events/${eventId}/signups`}>View signups</Link>
          <Link href={`/events/${eventId}/check-ins`}>View check-ins</Link>
        </div>
      )}
    </>
  );
};
