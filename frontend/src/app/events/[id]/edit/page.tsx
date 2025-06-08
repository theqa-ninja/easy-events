import { getEvent } from "@/app/events/events.service";
import { EditEventForm } from "./EditEventForm";
import Link from "next/link";
import { getUser } from "@/app/user/users.service";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const eventData = await getEvent(id);

  return {
    title: eventData?.title,
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
  const user = await getUser();
  const userMayEdit = user && user?.team_permissions?.find(permissions => permissions.user_type === "Superadmin" || permissions.user_type === "Admin" || permissions.user_type === "Event Coordinator");

  return (
    <main className="p-4 max-w-4xl m-auto">
      <Link href={`/events/${eventId}`} className="w-100">
        &lsaquo;&nbsp;Go back to event details
      </Link>
      <h1>Edit Event</h1>
      {eventData && userMayEdit ? (
        <EditEventForm eventData={eventData} />
      ) : (
        <p>Event edit page found or you don't have permission to edit the event.</p>
      )}
    </main>
  );
};

export default EditEventPage;
