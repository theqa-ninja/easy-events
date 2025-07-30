import Events from "../app/events/page";
import { getUser } from "@/app/user/users.service";

export default async function Home() {
  const user = await getUser();

  return (
    <>
      <h1>Welcome to Easy Events</h1>
      {user?.name && <h2>Hello {user.name}!</h2>}
      <Events />
    </>
  );
}
