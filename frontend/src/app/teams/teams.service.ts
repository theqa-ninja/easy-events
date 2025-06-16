import { getToken } from "@/app/utilities";
export interface IOrganization {
    id: string;
    name: string;
}

export const getTeams = async (): Promise<IOrganization[]> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/teams`, {
      method: "GET",
      headers: headers,
    });
    const data = await res.json();
    return data
  } catch (error) {
    throw error;
  }
};