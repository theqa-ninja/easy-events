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

export interface IPermission {
  EDIT_ORG: boolean;
  VIEW_ORG: boolean;
  CREATE_TEAM: boolean;
  EDIT_TEAM: boolean;
  VIEW_TEAM: boolean;
  CREATE_EVENT: boolean;
  EDIT_EVENT: boolean;
  VIEW_EVENT: boolean;
}

export interface ITeamPermission {
  organization: string;
  org_id: number;
  team: string;
  team_id: number;
  user_type: string;
  user_role_description: string;
  permissions: IPermission;
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

export const doesUserHavePermissions = async ({actionAndPage: actionAndPage, teamId: teamId, orgId: orgId}:{
  actionAndPage: 'CREATE_EVENT' | 'EDIT_EVENT' | 'CREATE_TEAM' | 'EDIT_TEAM' | 'VIEW_TEAM' | 'EDIT_ORG' | 'VIEW_ORG'
  teamId?: number,
  orgId?: number,
}): Promise<boolean> => {
  const user = await getUser();
  if (!user) {
    return false;
  }
  const permissions = user?.team_permissions?.find((permissions) =>
    permissions.team_id === teamId || permissions.org_id === orgId
  )?.permissions;
  if (!permissions) {
    return false;
  }
  const hasPermission = !!permissions[actionAndPage];
  console.log('actionAndPage', actionAndPage, 'hasPermission', hasPermission);
  return !!hasPermission;
};
