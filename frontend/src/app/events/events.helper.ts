export const eventDuration = (startTime: string = "", endTime: string = "") => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diff = end.getTime() - start.getTime();

  if (diff < 0) {
    return "End time must be a time after start time.";
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const duration = `${hours > 0 ? (hours > 1 ? `${hours} hours` : `${hours} hour`) : ""}
          ${minutes > 0 ? (minutes > 1 ? ` and ${minutes} minutes` : ` and ${minutes} minute`) : ""}`.trim();
  if (duration !== "") {
    return `${duration}`;
  }
};