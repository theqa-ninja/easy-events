import React from "react";
import { getEvent } from "../../events.service";
import { Event } from "../../components/Event";
import { Signup } from "../../components/Signup";

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
      {eventData && <Signup eventId={id} />}
    </main>
  );
};

export default EventDetails;
