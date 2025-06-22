import { getToken } from "@/app/utilities";
import { IUser } from "@/app/user/users.service";

export interface ISignup {
  id?: number;
  event_id?: number;
  user_id?: number;
  name: string;
  email: string;
  phone_number?: string;
  is_over_18: boolean;
  notes?: string;
  checked_in_at?: string | null;
  cancelled_at?: string | null;
  volunteer_role_id?: number;
}

export interface ISignups {
  adults: { filled: number; signups: ISignup[] };
  teenagers: { filled: number; signups: ISignup[] };
}

export const getSignup = async (eventId: number): Promise<any> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/events/${eventId}/signup`,
      {
        method: "GET",
        headers,
      }
    );
    const data = await response.json();
    if (response.status === 404) {
      console.log(data);
      return data as IUser;
    } else if (data.status === 500) {
      return false;
    }
    return data as ISignup;
  } catch (error) {
    throw error;
  }
};

export const getSignups = async (
  eventId: string
): Promise<ISignups> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/events/${eventId}/signups`,
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
  eventId: number,
  signup: ISignup
): Promise<ISignup> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/events/${eventId}/signup`,
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
  eventId: number,
  signupId: number,
  signup: ISignup
): Promise<ISignup> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/events/${eventId}/signup/${signupId}`,
      {
        method: "PATCH",
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

export const getSignupsSignup = async (
  eventId: number,
  signupId: number
): Promise<any> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/events/${eventId}/signup/${signupId}`,
      {
        method: "GET",
        headers,
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
