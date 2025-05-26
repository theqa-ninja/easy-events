import React from "react";
import { getEvents } from "./events.service";
import Link from "next/link";

const Events = async () => {
  const eventsData = await getEvents();
  return (
    <main className="flex flex-col items-center justify-between p-4 max-w-4xl m-auto">
      <h1>Events</h1>
      <div className="flex flex-col gap-4">
        {eventsData.map((event) => (
          <div key={event.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p>Date: {new Date(event.start_time).toLocaleDateString()}</p>
            <p>Start time: {new Date(event.start_time).toLocaleTimeString()}</p>
            <p>End time: {new Date(event.end_time).toLocaleTimeString()}</p>
            <p>Total adult volunteers needed: {event.adult_slots}</p>
            <p>Total teenager volunteers needed: {event.teenager_slots}</p>
            {/* TODO: Build remaining slots */}
            <p>{event.description}</p>
            <Link href={`events/${event.id}/signup`}>
              Sign up for this event
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Events;
