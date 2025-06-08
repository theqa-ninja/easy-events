import { getUser } from "@/app/user/users.service";
import Link from "next/link";

export const EventLinks = async ({ eventId }: { eventId: number }) => {
  const user = await getUser();
  const userMayEdit =
    user &&
    user?.team_permissions?.find(
      (permissions) =>
        permissions.user_type === "Superadmin" ||
        permissions.user_type === "Admin" ||
        permissions.user_type === "Event Coordinator"
    );
  return userMayEdit && (
    <div className="flex gap-4 mt-5">
      <Link href={`/events/${eventId}/edit`}>Edit this event</Link> 
      <Link href={`/events/${eventId}/signups`}>View signups</Link>
      <Link href={`/events/${eventId}/check-ins`}>View check-ins</Link>
    </div>
  );
};
