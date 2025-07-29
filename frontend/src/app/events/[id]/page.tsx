import React from "react";
import { getEvent } from "@/app/events/events.service";
import { Event } from "@/app/events/Event";
import { EventLinks } from "./EventLinks";
import Link from "next/link";
import { Card } from "@/app/components/Card";
import { validateToken } from "@/app/utilities";
import { SignupLinks } from "../SignupLinks";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const eventData = await getEvent(id);
  const loggedIn = await validateToken();

  return (
    <Card>
      <Link href="/events">&lsaquo;&nbsp;Go back to events</Link>
      {eventData && (
        <>
          <h1>{eventData.title}</h1>
          <Event eventData={eventData} />
          <div className="[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4">
            <Markdown remarkPlugins={[remarkGfm]}>{eventData.description}</Markdown>
          </div>
          <nav className="flex gap-4 mt-4">
            <SignupLinks event={eventData} loggedIn={loggedIn} />
          </nav>
        </>
      )}
      <EventLinks eventId={Number(id)} teamId={Number(eventData?.team_id)} />
    </Card>
  );
};

export default EventDetails;
