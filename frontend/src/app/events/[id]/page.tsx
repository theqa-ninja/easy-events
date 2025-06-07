import React from "react";
import { getEvent } from "@/app/events/events.service";
import { Event } from "@/app/events/Event";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const eventData = await getEvent(id);

  return {
    title: eventData?.title,
  };
}

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const eventData = await getEvent(id);

  return (
    <main className="flex flex-col items-center justify-between p-4 max-w-4xl m-auto">
      {eventData && <Event eventData={eventData} />}
    </main>
  );
};

export default EventDetails;
