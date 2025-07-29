import { getToken } from "@/app/utilities";
export interface ITeam {
  id: string;
  name: string;
  organization_id: string;
  volunteer_roles?: IVolunteerRole[];
}

export interface IVolunteerRole {
  id: number;
  role: string;
  team_id: number;
}

export const getTeam = async (
  organizationId: number,
  teamId: number
): Promise<ITeam> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/organizations/${organizationId}/teams/${teamId}`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTeams = async (organizationId: number): Promise<ITeam[]> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/organizations/${organizationId}/teams`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getVolunteerRoles = async (
  teamId: number
): Promise<IVolunteerRole[]> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/teams/${teamId}/volunteer_roles`,
      {
        method: "GET",
        headers,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
