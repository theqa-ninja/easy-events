import { getEvent } from "@/app/events/events.service";
import { CloneEventForm } from "./CloneEventForm";
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
    <main className="flex flex-col items-center justify-between p-4 max-w-4xl m-auto">
      <h1>Create Event from Clone</h1>
      {userMayEditEvents && eventData ? (
        <CloneEventForm eventData={eventData} />
      ) : (
        <p>Page not found or you don't have permission to clone the event.</p>
      )}
    </main>
  );
};

export default CloneEventPage;
