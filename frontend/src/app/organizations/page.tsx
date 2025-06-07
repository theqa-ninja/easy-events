import { getOrganizations } from "./organizations.service";

const OrganizationsPage = async () => {
    const organizationsData = await getOrganizations();
    console.log(organizationsData);

    return organizationsData && organizationsData.length > 0 ? (
        <main className="flex flex-col items-center justify-between p-4">
            <h1>Organizations</h1>
            {organizationsData.map((organization) => (
                <div key={organization.id} className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold">{organization.name}</h2>
                </div>
            ))}
        </main>
    ) : (
        <main className="flex flex-col items-center justify-between p-4">
            <h1>Organizations</h1>
            <p>No organizations found.</p>
        </main>
    );
};

export default OrganizationsPage;