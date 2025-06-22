import { ISignup } from "./[id]/signups.service";
import { getToken } from "@/app/utilities";

export interface IEvent {
  id?: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  adult_slots: number;
  teenager_slots: number;
  remaining_adult_slots: number;
  remaining_teenager_slots: number;
  team_id: number;
  creator_id?: number;
}

export interface IVolunteerRole {
  id: number;
  name: string;
}

export const getEvents = async (): Promise<IEvent[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getEvent = async (id: number): Promise<IEvent> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const createEvent = async (event: IEvent): Promise<IEvent> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/events`, {
      method: "POST",
      headers,
      body: JSON.stringify(event),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const editEvent = async (id: number, event: IEvent): Promise<IEvent> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/events/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(event),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCheckIns = async (
  id: number
): Promise<{
  adults: ISignup[];
  under_18: ISignup[];
}> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/events/${id}/checkins`,
      {
        method: "GET",
        headers,
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

// TODO: update this when volunteer roles are implemented
export const getVolunteerRoles = async (): Promise<IVolunteerRole[]> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/volunteer-roles`,
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
}

export const hasUserSignedUp = async (
  id: number
): Promise<boolean> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/events/${id}/signup`,
      {
        method: "GET",
        headers
      }
    );
    if (response.status !== 200) {
      return false;
    }
    return true;
  } catch (error) {
    throw error;
  }
};