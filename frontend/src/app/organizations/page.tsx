import { getOrganizations } from "./organizations.service";

const OrganizationsPage = async () => {
  const organizationsData = await getOrganizations();
  console.log(organizationsData);

  return organizationsData && organizationsData.length > 0 ? (
    <main className="flex flex-col items-center justify-between p-4">
      <h1>Organizations</h1>
      <ul>
        {organizationsData.map((organization) => (
          <li className="text-xl font-bold" key={organization.id}>{organization.name}</li>
        ))}
      </ul>
    </main>
  ) : (
    <main className="flex flex-col items-center justify-between p-4">
      <h1>Organizations</h1>
      <p>You need to log in to see your organizations or you do not have permission to view them.</p>
    </main>
  );
};

export default OrganizationsPage;
