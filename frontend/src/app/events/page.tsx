import React from "react";
import { getEvents, IEvent } from "./events.service";
import Link from "next/link";
import type { Metadata } from "next";
import { SignupLinks } from "./SignupLinks";
import { EventLinks } from "./[id]/EventLinks";
import { Event } from "./Event";
import { validateToken } from "../utilities";
import { Card } from "../components/Card";
import { DropDown } from "../components/DropDown";
import { Button } from "../components/Button";
import { signupsAreClosed } from "./events.helper";
import { getMySignups } from "./[id]/signups.service";
import { CreateEventLink } from "./CreateEventLink";
import { getUser } from "../user/users.service";

export const metadata: Metadata = {
  title: "Upcoming Events",
};

const Events = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    team_id?: number;
    org_id?: number;
    filter?: string;
  }>;
}) => {
  const params = new URLSearchParams();
  const getParams = await searchParams;
  const team_id = getParams?.team_id;
  const org_id = getParams?.org_id;
  const filter = getParams?.filter;

  if (team_id) {
    params.append("team_id", team_id.toString());
  }
  if (org_id) {
    params.append("org_id", org_id.toString());
  }
  if (filter) {
    params.append("filter", filter);
  }

  const user = await getUser();
  const eventsData = await getEvents(params.toString());
  const loggedIn = await validateToken();
  const userSignups = await getMySignups();
  const teamChoices = eventsData
    .map((event) => ({
      label: event.team_name || "All",
      value: event.team_id?.toString() || "",
    }))
    .filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.value === obj.value)
    );
  const orgChoices = eventsData
    .map((event) => ({
      label: event.org_name || "All",
      value: event.org_id?.toString() || "",
    }))
    .filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.value === obj.value)
    );

  const eventsOpen = eventsData.filter((event) => !signupsAreClosed(event));

  const eventsClosed = eventsData.filter((event) => signupsAreClosed(event));
  const userSignedUp = (event: IEvent) =>
    userSignups.find((signup) => signup.event_id === event.id) ? true : false;

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1>Events</h1>
        <CreateEventLink teamId={user?.team_permissions?.[0]?.team_id} />
      </header>
      <nav>
        <form className="flex gap-4 mb-4 items-end">
          <DropDown
            label="Filter"
            choices={[
              { label: "Upcoming", value: "upcoming" },
              { label: "Past", value: "past" },
              { label: "All", value: "all" },
            ]}
            defaultValue={filter || "upcoming"}
            name="filter"
          />
          {teamChoices && (
            <DropDown
              label="Team"
              choices={[{ label: "All", value: "" }, ...teamChoices]}
              defaultValue={team_id ? team_id.toString() : ""}
              name="team_id"
            />
          )}
          {orgChoices && (
            <DropDown
              label="Organization"
              choices={[{ label: "All", value: "" }, ...orgChoices]}
              defaultValue={org_id ? org_id.toString() : ""}
              name="org_id"
            />
          )}
          <Button
            id="search"
            label="Search"
            type="submit"
            classNames="!m-0 !mb-1 !self-end"
          />
        </form>
      </nav>
      {eventsOpen.length > 0 || eventsClosed.length > 0 ? (
      <div className="flex flex-col gap-4">
        {eventsOpen.map((event) => (
          <Card key={event.id}>
            <h2 className="text-xl font-bold">
              <Link href={`events/${event.id}`}>{event.title}</Link>
            </h2>
            <Event eventData={event} />
            <nav className="flex gap-4 mt-4">
              <SignupLinks
                event={event}
                loggedIn={loggedIn}
                userSignedUp={userSignedUp(event)}
              />
            </nav>
            <EventLinks
              eventId={Number(event.id)}
              teamId={Number(event.team_id)}
            />
          </Card>
        ))}
        {eventsClosed.length > 0 && (
          <h2 className="mt-4 !mb-0">Closed Events</h2>
        )}
        {eventsClosed.map((event) => (
          <Card key={event.id}>
            <h2 className="text-xl font-bold">
              <Link href={`events/${event.id}`}>{event.title}</Link>
            </h2>
            <Event eventData={event} />
            <nav className="flex gap-4 mt-4">
              <SignupLinks
                event={event}
                loggedIn={loggedIn}
                userSignedUp={userSignedUp(event)}
              />
            </nav>
            <EventLinks
              eventId={Number(event.id)}
              teamId={Number(event.team_id)}
            />
          </Card>
        ))}
      </div>
      ) : (
        <Card>There are no {filter || "upcoming"} events at this time.</Card>
      )}
    </>
  );
};

export default Events;
