import { getEvent } from "@/app/events/events.service";
import { CloneEventForm } from "./CloneEventForm";
import { doesUserHavePermissions } from "@/app/user/users.service";
import Link from "next/link";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const eventData = await getEvent(id);

  return {
    title: `Edit ${eventData?.title}`,
  };
};

const CloneEventPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const eventId = Number(id);
  const eventData = await getEvent(eventId);
  const userMayEditEvents = await doesUserHavePermissions({
    actionAndPage: "EDIT_EVENT",
    teamId: eventData.team_id,
  });

  return (
    <>
      <nav className="flex gap-2">
        <span className="text-secondary">&lsaquo;</span>
        <Link href="/events">Events</Link>
        <span className="text-secondary">&lsaquo;</span>
        <Link href={`/events/${eventId}`}>
          Event details
        </Link>
      </nav>
      <h1>Create Event from Clone</h1>
      {userMayEditEvents && eventData ? (
        <CloneEventForm eventData={eventData} />
      ) : (
        <p>Page not found or you don't have permission to clone the event.</p>
      )}
      <nav className="flex gap-2">
        <span className="text-secondary">&lsaquo;</span>
        <Link href="/events">Events</Link>
        <span className="text-secondary">&lsaquo;</span>
        <Link href={`/events/${eventId}`}>
          Event details
        </Link>
      </nav>
    </>
  );
};

export default CloneEventPage;
