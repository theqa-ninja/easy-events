import { IEvent } from "./events.service";

export const eventDuration = (startTime: string = "", endTime: string = "") => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diff = end.getTime() - start.getTime();

  if (diff < 0) {
    return "End time must be a time after start time.";
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const duration = `${days > 0 ? (days > 1 ? `${days} days` : `${days} day`) : ""} ${hours > 0 ? (hours > 1 ? `${hours} hours` : `${hours} hour`) : ""}
          ${minutes > 0 ? (minutes > 1 ? ` and ${minutes} minutes` : ` and ${minutes} minute`) : ""}`.trim();
  if (duration !== "") {
    return `${duration}`;
  }
};

export const signupsAreClosed = (event: IEvent) => {
  const isEventClosed = event.close_time
    ? event.close_time < new Date().toISOString()
    : event.end_time < new Date().toISOString();

  return isEventClosed || (event.remaining_adult_slots === 0 && event.remaining_teenager_slots === 0);
}