import { getToken } from "@/app/utilities";
export interface IUser {
    id: string;
    name: string;
    email: string;
    phone_number?: string;
    is_over_18: boolean;
    team_permissions?: ITeamPermission[];
}

export interface ITeamPermission {
    team?: string;
    user_type: string;
}

export const getUser = async (): Promise<IUser|undefined> => {
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
    if (res.status === 401) {
      return;
    }
    return data
  } catch (error) {
    throw error;
  }
};

export const editUser = async (userId: string, userData: IUser): Promise<IUser> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const doesUserHavePermissions = async (userTypes: string[]): Promise<boolean> => {
  const user = await getUser();
  if (!user) {
    return false;
  }
  return user?.team_permissions?.find(permissions => userTypes.includes(permissions.user_type)) ? true : false;
}