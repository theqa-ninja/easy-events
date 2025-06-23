import React from "react";
import { getEvent } from "@/app/events/events.service";
import { Event } from "@/app/events/Event";
import { EventLinks } from "./EventLinks";
import Link from "next/link";

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

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const eventData = await getEvent(id);

  return (
    <main className="mt-5 p-4 max-w-4xl m-auto w-full not-dark:bg-white dark:bg-slate-700 rounded shadow">
      <Link href="/events">&lsaquo;&nbsp;Go back to events</Link>
      {eventData && (
        <>
          <h1>{eventData.title}</h1>
          <Event eventData={eventData} />
        </>
      )}
      <EventLinks eventId={Number(id)} />
    </main>
  );
};

export default EventDetails;
