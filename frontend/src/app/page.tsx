import Events from "../app/events/page";
import { getUser } from "@/app/user/users.service";

const Home = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    team_id?: number;
    org_id?: number;
    filter?: string;
  }>;
}) => {
  const user = await getUser();

  return (
    <>
      <h1>Welcome to Easy Events</h1>
      {user?.name && <h2>Hello {user.name}!</h2>}
      <Events searchParams={searchParams} />
    </>
  );
}

export default Home;