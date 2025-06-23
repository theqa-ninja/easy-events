import { getToken } from "@/app/utilities";

export interface IOrganization {
  id?: string;
  name: string;
  description?: string;
}

export const getOrganizations = async (): Promise<IOrganization[]> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/organizations`,
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

export const createOrganization = async (
  organization: IOrganization
): Promise<IOrganization> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/organizations`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(organization),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getOrganization = async (id: number): Promise<IOrganization> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/organizations/${id}`,
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