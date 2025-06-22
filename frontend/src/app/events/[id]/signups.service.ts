import { getToken } from "@/app/utilities";
import { IUser } from "@/app/user/users.service";

export interface ISignup {
  id?: number;
  event_id: number;
  user_id?: number;
  role?: string;
  name: string;
  email: string;
  phone_number: string;
  is_over_18: boolean;
  notes?: string;
  checked_in_at?: string;
  cancelled_at?: string;
}

export const getSignup = async (id: number): Promise<any> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/signups/${id}`,
      {
        method: "GET",
        headers
      }
    );
    const data = await response.json();
    if (response.status === 404) {
      return data as IUser;
    } else if (data.status === 500) {
      return false;
    }
    return data as ISignup;
  } catch (error) {
    throw error;
  }
};

export const getSignups = async (): Promise<{
  adults: { filled: number; signups: ISignup[] };
  under_18: { filled: number; signups: ISignup[] };
}> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/signups`,
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

export const createSignup = async (
  signup: ISignup
): Promise<ISignup> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/signup`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(signup),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const editSignup = async (
  id: string,
  signup: ISignup
): Promise<ISignup> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/signup/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(signup),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSignupsSignup = async (id: number, signupId: number): Promise<any> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/events/${id}/signup/${signupId}`,
      {
        method: "GET",
        headers
      }
    );
    const data = await response.json();
    if (data.status === "not_found") {
      return data as IUser;
    } else if (data.status === 500) {
      return false;
    }
    return data as ISignup;
  } catch (error) {
    throw error;
  }
};