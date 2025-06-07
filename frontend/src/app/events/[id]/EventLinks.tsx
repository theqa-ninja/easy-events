import Link from "next/link";

export const EventLinks = ({ eventId }: { eventId: number }) => {
  return (
    <>
      <Link href={`/events/${eventId}/edit`}>Edit this event</Link>
    </>
  );
};
