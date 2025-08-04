import { IEvent } from "./events.service";
import { formatDateTime } from "../utilities";
import { eventDuration } from "./events.helper";
import Link from "next/link";

export const Event = ({ eventData }: { eventData: IEvent }) => {
  const optionsDate: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const duration = eventDuration(eventData.start_time, eventData.end_time);

  return (
    <div key={eventData.id} className="w-full">
      <Link href={`/events/?team_id=${eventData.team_id}`}>
        {eventData.team_name}
      </Link>
      <dl>
        <dl>
          <dt>Starts:</dt>
          <dd>{formatDateTime(eventData.start_time, optionsDate)}</dd>
        </dl>
        <dl>
          <dt>Ends:</dt>
          <dd>{formatDateTime(eventData.end_time, optionsDate)}</dd>
        </dl>
        <dl>
          <dt>Duration:</dt>
          <dd>{duration}</dd>
        </dl>
        <dl>
          <dt>Adult volunteers:</dt>
          <dd>
            {eventData.remaining_adult_slots} of {eventData.adult_slots} slots
            open
          </dd>
        </dl>
        <dl>
          <dt>Teenager volunteers:</dt>
          <dd>
            {eventData.remaining_teenager_slots} of {eventData.teenager_slots}{" "}
            slots open
          </dd>
        </dl>
      </dl>
    </div>
  );
};
