"use client";
import { editEvent, deleteEvent, IEvent, ITeam, eventSchema } from "@/app/events/events.service";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { Textarea } from "@/app/components/Textarea";
import { isoDateTime, validateOnBlur } from "@/app/utilities";
import { useEffect, useState } from "react";
import { Toast } from "@/app/components/Toast";
import { eventDuration } from "../../events.helper";
import { DropDown } from "@/app/components/Dropdown";

export const EditEventForm = ({ eventData, teams }: { eventData: IEvent, teams: ITeam[] }) => {
  const [startTime, setStartTime] = useState(eventData.start_time);
  const [endTime, setEndTime] = useState(eventData.end_time);
  const [duration, setDuration] = useState<string | undefined>();
  const [toast, setToast] = useState<{
    message: string;
    status: "success" | "error";
  }>();
  const [errors, setErrors] = useState<{ [name: string]: string }>({});

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    validateOnBlur(event, eventSchema, setErrors);
  };
  const submitEventInformation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData);
    const event: IEvent = {
      // id is generated by backend, so it is omitted here
      title: formEntries.title as string,
      description: formEntries.description as string,
      start_time: formEntries.start_time as string,
      end_time: formEntries.end_time as string,
      adult_slots: Number(formEntries.adult_slots),
      teenager_slots: Number(formEntries.teenager_slots),
      // creator id is set to current_user.id in the events_controller create action
      team_id: Number(formEntries.team_id),
    };
    try {
      eventSchema.validateSync(formEntries, {
        abortEarly: false,
      });
      editEvent(Number(eventData.id), event)
        .then((response) => {
          console.log(response);
          setToast({
            message: "Event updated",
            status: "success",
          });
        })
        .catch((error) => {
          setToast({
            message: "Error creating event",
            status: "error",
          });
        });
    } catch (validationError: any) {
      const formattedError = validationError.inner.reduce(
        (acc: any, err: any) => {
          acc[err.path] = err.message;
          return acc;
        },
        {}
      );
      setErrors(formattedError);
    }
  };

  const handleDeleteEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this event?")) {
      deleteEvent(eventData.id as number)
        .then(() => {
          setToast({ message: "Event deleted", status: "success" });
        })
        .catch((error) => {
          setToast({ message: "Error deleting event", status: "error" });
        });
    }
  };

  useEffect(() => {
    if (startTime && endTime) {
      setDuration(eventDuration(startTime, endTime));
    }
  }, [startTime, endTime]);

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          onClose={() => setToast(undefined)}
        />
      )}
      <form
        onSubmit={submitEventInformation}
        className="flex flex-col gap-4 w-100"
      >
        <Input
          label="Event Title"
          type="text"
          name="title"
          placeholder="Event Title"
          defaultValue={eventData?.title}
          onBlur={handleChange}
          errorMessage={errors.title}
        />
        <Input
          label="Start"
          type="datetime-local"
          name="start_time"
          defaultValue={
            eventData?.start_time && isoDateTime(eventData?.start_time)
          }
          onBlur={handleChange}
          onInput={(e) => {
            setStartTime(e.currentTarget.value);
          }}
          errorMessage={errors.start_time}
        />
        <Input
          label="End"
          type="datetime-local"
          name="end_time"
          defaultValue={eventData?.end_time && isoDateTime(eventData?.end_time)}
          onBlur={handleChange}
          onInput={(e) => {
            setEndTime(e.currentTarget.value);
          }}
          errorMessage={errors.end_time}
        />
        {duration && <p>Duration: {duration}</p>}
        <Input
          label="Adult volunteers needed"
          type="number"
          name="adult_slots"
          defaultValue={eventData?.adult_slots}
          onBlur={handleChange}
          errorMessage={errors.adult_slots}
        />
        <Input
          label="Teenager volunteers needed"
          type="number"
          name="teenager_slots"
          defaultValue={eventData?.teenager_slots}
          onBlur={handleChange}
          errorMessage={errors.teenager_slots}
        />
        <Textarea
          label="Event description"
          name="description"
          defaultValue={eventData?.description}
          onBlur={handleChange}
          errorMessage={errors.description}
        />
        <DropDown
          choices={teams}
          name="team_id"
          label="Team"
          helpText="Please select a team"
          defaultValue={String(eventData.team_id)}
        />

        <Button type="submit" label="Edit event" />
      </form>
      <form onSubmit={handleDeleteEvent} className="flex flex-col gap-4 w-100">
        <Button type="submit" label="Soft delete this event" />
      </form>
    </>
  );
};

export default EditEventForm;
