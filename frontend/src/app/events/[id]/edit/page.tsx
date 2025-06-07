import { getEvent } from "@/app/events/events.service";
import { EditEventForm } from "./EditEventForm";

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
}

const EditEventPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const eventId = Number(id);
  const eventData = await getEvent(eventId);

  return (
    <main className="flex flex-col items-center justify-between p-4 max-w-4xl m-auto">
      <h1>Edit Event</h1>
      <EditEventForm eventData={eventData} />
    </main>
  );
}

export default EditEventPage;