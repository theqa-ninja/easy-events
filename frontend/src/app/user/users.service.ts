import { getToken } from "@/app/utilities";
export interface IUser {
    id: string;
    name: string;
    email: string;
    phone_number?: string;
    is_over_18: boolean;
}

export const getUser = async (): Promise<IUser> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };

    const res = await fetch(`http://localhost:3000/api/v1/users/me`, {
      method: "GET",
      headers: headers,
    });
    const data = await res.json();
    return data
  } catch (error) {
    throw error;
  }
};