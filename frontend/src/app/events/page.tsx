import React from "react";
import { getEvents } from "./events.service";
import Link from "next/link";
import type { Metadata } from "next";
import { SignupLinks } from "./SignupLinks";
import { EventLinks } from "./[id]/EventLinks";
import { Event } from "./Event";
import { validateToken } from "../utilities";

export const metadata: Metadata = {
  title: "Upcoming Events",
};

const Events = async () => {
  const eventsData = await getEvents();
  const loggedIn = await validateToken();
  return (
    <main className="flex flex-col items-center justify-between p-4 max-w-4xl m-auto">
      <h1>Events</h1>
      <div className="flex flex-col gap-4">
        {eventsData.map((event) => (
          <div key={event.id} className="not-dark:bg-white dark:bg-slate-700 p-4 rounded shadow">
            <h2 className="text-xl font-bold">
              <Link href={`events/${event.id}`}>{event.title}</Link>
            </h2>
            <Event eventData={event} />
            <nav className="flex gap-4">
              <SignupLinks event={event} loggedIn={loggedIn} />
            </nav>
            <EventLinks eventId={Number(event.id)} teamId={Number(event.team_id)} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Events;
