import { getTeams } from "./teams.service";

const TeamsPage = async () => {
    const teamsData = await getTeams();
    console.log(teamsData);

    return teamsData && teamsData.length > 0 ? (
        <main className="flex flex-col items-center justify-between p-4">
            <h1>Teams</h1>
            {teamsData.map((team) => (
                <div key={team.id} className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold">{team.name}</h2>
                </div>
            ))}
        </main>
    ) : (
        <main className="flex flex-col items-center justify-between p-4">
            <h1>Teams</h1>
            <p>No teams found.</p>
        </main>
    );
};

export default TeamsPage;