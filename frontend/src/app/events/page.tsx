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

const Events = async ({
  searchParams,
}: {
  searchParams: Promise<{ team_id?: number; org_id?: number; filter?: string }>;
}) => {
  const params = new URLSearchParams();
  const { team_id, org_id, filter } = await searchParams;
  
  if (team_id) {
    params.append("team_id", team_id.toString());
  }
  if (org_id) {
    params.append("org_id", org_id.toString());
  }
  if (filter) {
    params.append("filter", filter);
  }

  const eventsData = await getEvents(params.toString());
  const loggedIn = await validateToken();

  return (
    <>
      <h1>Events</h1>
      <nav className="flex gap-4 mb-4">
        <Link href="/events">All events</Link>
        <Link href="/events?filter=upcoming">Upcoming events</Link>
        <Link href="/events?filter=past">Past events</Link>
      </nav>
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
