import { getEvent, getEventTeams } from "@/app/events/events.service";
import { EditEventForm } from "./EditEventForm";
import Link from "next/link";
import { doesUserHavePermissions } from "@/app/user/users.service";

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

const EditEventPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const eventId = Number(id);
  const eventData = await getEvent(eventId);
  const userMayEditEvents = await doesUserHavePermissions({
    actionAndPage: "EDIT_EVENT",
    teamId: eventData.team_id
  });
  const teams = await getEventTeams();

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
      <h1>Edit Event</h1>
      {userMayEditEvents && eventData ? (
        <EditEventForm eventData={eventData} teams={teams} />
      ) : (
        <p>
          Event edit page not found or you don't have permission to edit the
          event.
        </p>
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

export default EditEventPage;
