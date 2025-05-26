import { IEvent } from "../events.service";
import { formatDateTime } from "../../utilities";

export const Event = ({ eventData } : { eventData: IEvent }) => {
  return (
    <div key={eventData.id}>
      <h1>{eventData.title}</h1>
      <p>{eventData.description}</p>
      <dl>
        <dt>Start time</dt>
        <dd>{formatDateTime(eventData.start_time)}</dd>
      </dl>
      <dl>
        <dt>End time</dt>
        <dd>{formatDateTime(eventData.end_time)}</dd>
      </dl>
      <dl>
        <dt>Adult slots</dt>
        <dd>{eventData.adult_slots}</dd>
      </dl>
      <dl>
        <dt>Teenager slots</dt>
        <dd>{eventData.teenager_slots}</dd>
      </dl>
    </div>
  );
};
