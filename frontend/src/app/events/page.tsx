import React from "react";
import { getEvents } from "./events.service";
import Link from "next/link";
import type { Metadata } from "next";
import { SignupLinks } from "./SignupLinks";
import { EventLinks } from "./[id]/EventLinks";
import { Event } from "./Event";
import { validateToken } from "../utilities";
import { Card } from "../components/Card";
import { DropDown } from "../components/Dropdown";
import { Button } from "../components/Button";

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

  const eventsData = await getEvents(params.toString());
  const loggedIn = await validateToken();
  const teamChoices = eventsData
    .map((event) => ({
      label: event.team_name,
      value: event.team_id.toString(),
    }))
    .filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.value === obj.value)
    );
  const orgChoices = eventsData
    .map((event) => ({
      label: event.org_name,
      value: event.org_id.toString(),
    }))
    .filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.value === obj.value)
    );

  return (
    <>
      <h1>Events</h1>
      <nav>
        <form className="flex gap-4 mb-4 items-end">
          <DropDown
            label="Filter"
            choices={[
              { label: "Upcoming", value: "upcoming" },
              { label: "Past", value: "past" },
              { label: "All", value: "all" },
            ]}
            defaultValue="upcoming"
            name="filter"
          />
          {teamChoices && (
            <DropDown
              label="Team"
              choices={teamChoices}
              defaultValue={team_id ? team_id.toString() : ""}
              name="team_id"
            />
          )}
          {orgChoices && (
            <DropDown
              label="Organization"
              choices={orgChoices}
              defaultValue={org_id ? org_id.toString() : ""}
              name="org_id"
            />
          )}
          <Button id="search" label="Search" type="submit" classNames="!m-0 !mb-1 !self-end" />
        </form>
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
            <EventLinks
              eventId={Number(event.id)}
              teamId={Number(event.team_id)}
            />
          </Card>
        ))}
      </div>
    </>
  );
};

export default Events;
