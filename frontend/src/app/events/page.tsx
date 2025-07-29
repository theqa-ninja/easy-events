import React from "react";
import { getEvents } from "./events.service";
import Link from "next/link";
import type { Metadata } from "next";
import { SignupLinks } from "./SignupLinks";
import { EventLinks } from "./[id]/EventLinks";
import { Event } from "./Event";
import { validateToken } from "../utilities";
import { Card } from "../components/Card";

export const metadata: Metadata = {
  title: "Upcoming Events",
};

const Events = async () => {
  const eventsData = await getEvents();
  const loggedIn = await validateToken();
  return (
    <>
      <h1>Events</h1>
      <div className="flex flex-col gap-4">
        {eventsData.map((event) => (
          <Card key={event.id}>
            <h2 className="text-xl font-bold">
              <Link href={`events/${event.id}`}>{event.title}</Link>
            </h2>
            <Event eventData={event} />
            <nav className="flex gap-4 mt-4">
              <SignupLinks event={event} loggedIn={loggedIn} />
            </nav>
            <EventLinks eventId={Number(event.id)} teamId={Number(event.team_id)} />
          </Card>
        ))}
      </div>
    </>
  );
};

export default Events;
