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
  }

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
}

export const createEvent = async (event: IEvent): Promise<IEvent> => {
  try {
        const response = await fetch(`http://localhost:3000/api/v1/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const editEvent = async (id: string, event: IEvent): Promise<IEvent> => {
  try {
        const response = await fetch(`http://localhost:3000/api/v1/events/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const getSignup = async (id: string, signupId: string): Promise<ISignup[]> => {
  try {
        const response = await fetch(`http://localhost:3000/api/v1/events/${id}/signups/${signupId}`, {
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
}

export const getSignups = async (id: string): Promise<ISignup[]> => {
  try {
        const response = await fetch(`http://localhost:3000/api/v1/events/${id}/signups`, {
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
}

export const createSignup = async (id: string, signup: ISignup): Promise<ISignup> => {
  try {
        const response = await fetch(`http://localhost:3000/api/v1/events/${id}/signups`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signup),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const editSignup = async (id: string, signupId: string, signup: ISignup): Promise<ISignup> => {
  try {
        const response = await fetch(`http://localhost:3000/api/v1/events/${id}/signups/${signupId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signup),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}