import { IEvent } from "./events.service";
import { formatDateTime } from "../utilities";
import { eventDuration } from "./events.helper";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Event = ({ eventData }: { eventData: IEvent }) => {
  const optionsDate: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <div key={eventData.id} className="w-full">
      {/* TODO: add a page for filtering events by team */}
      <Link href="">{eventData.team_name}</Link>
      <dl>
        <dl>
          <dt>Date:</dt>
          <dd>{formatDateTime(eventData.start_time, optionsDate)}</dd>
        </dl>
        <dl>
          <dt>Time:</dt>
          <dd>
            {formatDateTime(eventData.start_time, optionsTime)} to{" "}
            {formatDateTime(eventData.end_time, optionsTime)} (
            {eventDuration(eventData.start_time, eventData.end_time)})
          </dd>
        </dl>
        <dl>
          <dt>Adult volunteers:</dt>
          <dd>
            <b>{eventData.remaining_adult_slots}</b> remaining openings out of{" "}
            <b>{eventData.adult_slots}</b> total
          </dd>
        </dl>
        <dl>
          <dt>Teenagers volunteers:</dt>
          <dd>
            <b>{eventData.remaining_teenager_slots}</b> remaining openings out
            of <b>{eventData.teenager_slots}</b> total
          </dd>
        </dl>
      </dl>
      <div className="[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4">
        <Markdown remarkPlugins={[remarkGfm]}>{eventData.description}</Markdown>
      </div>
    </div>
  );
};
