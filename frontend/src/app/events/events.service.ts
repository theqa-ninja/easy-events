import { getUser } from "@/app/user/users.service";
import { ISignup } from "@/app/events/[id]/signups.service";
import { getToken } from "@/app/utilities";
import { number, object, string } from "yup";
import { IVolunteerRole } from "@/app/organizations/[id]/teams/teams.service";

export interface IEvent {
  id?: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  adult_slots: number;
  teenager_slots: number;
  remaining_adult_slots?: number;
  remaining_teenager_slots?: number;
  team_id: number;
  creator_id?: number;
  team_name?: string;
  close_time?: string; // when to no longer accept signups and cancellations
  volunteer_role_ids?: number[];
  event_lead_name?: string;
  volunteer_roles: IVolunteerRole[];
}

export interface ITeam {
  value: string;
  label: string;
}

export interface ICheckIns {
  adults: ISignup[];
  teenagers: ISignup[];
}

export const eventSchema = object({
  title: string().required("Event title is required"),
  description: string().required("Event description is required"),
  start_time: string().required("Start time is required"),
  end_time: string().required("End time is required"),
  adult_slots: number()
    .required("Adult slots is required")
    .typeError("Adult slots must be a number")
    .positive("Adult slots must be greater than zero"),
  teenager_slots: number()
    .required("Teenager slots is required")
    .typeError("Teenager slots must be a number")
    .positive("Teenager slots must be greater than zero"),
  team_id: string().required("Team is required"),
});

export const getEvents = async (): Promise<IEvent[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/events`,
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

export const getEvent = async (id: number): Promise<IEvent> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/events/${id}`,
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

export const createEvent = async (event: IEvent): Promise<IEvent> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/events`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(event),
      }
    );
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/events/${id}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(event),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (id: number): Promise<void> => {
  try {
    const token = await getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/events/${id}`, {
      method: "DELETE",
      headers,
    });
  } catch (error) {
    throw error;
  }
};

export const getCheckIns = async (
  id: number
): Promise<ICheckIns> => {
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
    return data;
  } catch (error) {
    throw error;
  }
};

export const hasUserSignedUp = async (id: number): Promise<boolean> => {
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
        headers,
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

export const getEventTeams = async (): Promise<ITeam[]> => {
  const user = await getUser();
  const teams = user?.team_permissions?.map((permission: any) => {
    return { value: permission.team_id, label: permission.team };
  });
  return teams || [];
};
