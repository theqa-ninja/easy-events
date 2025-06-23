import { IEvent } from "./events.service";
import { formatDateTime } from "../utilities";
import { eventDuration } from "./events.helper";

export const Event = ({ eventData }: { eventData: IEvent }) => {
  const optionsDate: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  }

  return (
    <div key={eventData.id} className="w-full">
      <dl>
        <dl>
          <dt>Date:</dt>
          <dd>{formatDateTime(eventData.start_time, optionsDate)}</dd>
        </dl>
        <dl>
          <dt>Start time:</dt>
          <dd>{formatDateTime(eventData.start_time, optionsTime)}</dd>
        </dl>
        <dl>
          <dt>End time:</dt>
          <dd>{formatDateTime(eventData.end_time, optionsTime)}</dd>
        </dl>
        <dl>
          <dt>Duration:</dt>
          <dd>{eventDuration(eventData.start_time, eventData.end_time)}</dd>
        </dl>
        <dl>
          <dt>Total adult volunteers needed:</dt>
          <dd>
            {eventData.remaining_adult_slots} of {eventData.adult_slots}
          </dd>
        </dl>
        <dl>
          <dt>Total teenager volunteers needed:</dt>
          <dd>
            {eventData.remaining_teenager_slots} of {eventData.teenager_slots}
          </dd>
        </dl>
      </dl>
      <p>{eventData.description}</p>
    </div>
  );
};
