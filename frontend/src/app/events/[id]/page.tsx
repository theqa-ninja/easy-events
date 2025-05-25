import React from "react";
import { Button } from "../../components/Button";
import { formatDateTime } from "../../utilities";

const EventDetails = async ({params}:{
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;
  const data:any = await fetch(`http://localhost:3000/api/v1/events/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);

  return (
    <main className="flex flex-col items-center justify-between p-4 max-w-4xl m-auto">
      {data && (
        <div key={data.id}>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <dl>
            <dt>Start time</dt>
            <dd>{formatDateTime(data.start_time)}</dd>
          </dl>
          <dl>
            <dt>End time</dt>
            <dd>{formatDateTime(data.end_time)}</dd>
          </dl>
          <dl>
            <dt>Adult slots</dt>
            <dd>{data.adult_slots}</dd>
          </dl>
          <dl>
            <dt>Teenager slots</dt>
            <dd>{data.teenager_slots}</dd>
          </dl>
        </div>
      )}
      <Button label="Sign up here"></Button>
    </main>
  );
};

export default EventDetails;
