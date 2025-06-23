import React from "react";
import { getEvents } from "./events.service";
import Link from "next/link";
import type { Metadata } from "next";
import { SignupLinks } from "./SignupLinks";
import { EventLinks } from "./[id]/EventLinks";
import { Event } from "./Event";

export const metadata: Metadata = {
  title: "Upcoming Events",
};

const Events = async () => {
  const eventsData = await getEvents();
  return (
    <main className="flex flex-col items-center justify-between p-4 max-w-4xl m-auto">
      <h1>Events</h1>
      <div className="flex flex-col gap-4">
        {eventsData.map((event) => (
          <div key={event.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">
              <Link href={`events/${event.id}`}>{event.title}</Link>
            </h2>
            <Event eventData={event} />
            <nav className="flex gap-4">
              <SignupLinks eventId={Number(event.id)} />
            </nav>
            <EventLinks eventId={Number(event.id)} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Events;
