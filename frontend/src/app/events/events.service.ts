import { getToken } from "../utilities";

export interface IEvent {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  adult_slots: number;
  teenager_slots: number;
}

export interface ISignup {
  id?: number;
  event_id: number;
  user_id: number;
  role?: string;
  user_name: string;
  user_email: string;
  user_phone_number: string;
  user_is_over_18: boolean;
  notes?: string;
  checked_in_at?: string;
  cancelled_at?: string;
}

export const getEvents = async (): Promise<IEvent[]> => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/events`, {
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

export const getEvent = async (id: string): Promise<IEvent> => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/events/${id}`, {
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
    const response = await fetch(`http://localhost:3000/api/v1/events`, {
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

export const editEvent = async (id: string, event: IEvent): Promise<IEvent> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(`http://localhost:3000/api/v1/events/${id}`, {
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

export const getSignup = async (
  id: string
): Promise<ISignup> => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/events/${id}/signup`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSignups = async (id: string): Promise<{
  adults: {filled: number, signups: ISignup[]}, 
  under_18: {filled: number, signups: ISignup[]}
}> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/events/${id}/signups`,
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
  id: number,
  signup: ISignup
): Promise<ISignup> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/events/${id}/signup`,
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
    const response = await fetch(
      `http://localhost:3000/api/v1/events/${id}/signup`,
      {
        method: "PUT",
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
