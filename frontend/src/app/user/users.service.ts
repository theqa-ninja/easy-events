import { getToken } from "@/app/utilities";
import { ITeam } from "../organizations/[id]/teams/teams.service";
export interface IUser {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  is_over_18: boolean;
  team_permissions?: ITeamPermission[];
}

export interface ITeamPermission {
  team?: ITeam;
  team_id: number;
  user_type: string;
}

export const getUser = async (): Promise<IUser | undefined> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/users/me`, {
      method: "GET",
      headers: headers,
    });
    const data = await res.json();
    if (res.status === 401) {
      return;
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const editUser = async (
  userId: string,
  userData: IUser
): Promise<IUser> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/users/${userId}`, {
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

export const createUserAccount = async (userData: IUser): Promise<Response> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/`, {
      method: "POST",
      headers,
      body: JSON.stringify(userData),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const signInUser = async (userData: IUser): Promise<Response> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    console.log(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/sign_in`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/sign_in`, {
      method: "POST",
      headers,
      body: JSON.stringify(userData),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async (): Promise<Response> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/sign_out`, {
      method: "POST",
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const newPassword = async (
  userData: IUser,
  accessToken: string | null,
  client: string | null,
  uid: string | null
): Promise<Response> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "access-token": accessToken || "",
      client: client || "",
      uid: uid || "",
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/password/`, {
      method: "PUT",
      headers,
      body: JSON.stringify(userData),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const passwordReset = async (userData: string): Promise<Response> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/auth/password/`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(userData),
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const doesUserHavePermissions = async (
  userTypes: string[]
): Promise<boolean> => {
  const user = await getUser();
  if (!user) {
    return false;
  }
  return user?.team_permissions?.find((permissions) =>
    userTypes.includes(permissions.user_type)
  )
    ? true
    : false;
};
