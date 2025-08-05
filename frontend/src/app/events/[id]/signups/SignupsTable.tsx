import { ISignup } from "@/app/events/[id]/signups.service";
import Link from "next/link";
import { CheckedInAt } from "./CheckedInAt";
import { IVolunteerRole } from "@/app/organizations/[id]/teams/teams.service";
import { VolunteerRoles } from "./VolunteerRoles";
import { Card } from "@/app/components/Card";

export const SignupsTable = async ({
  signupsData,
  volunteerRoles,
}: {
  signupsData: ISignup[];
  volunteerRoles?: IVolunteerRole[];
}) => {
  return signupsData && signupsData.length > 0 ? (
    <>
      {Object.values(signupsData).map((signup) => (
        <Card key={signup.id} classNames="mb-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <Link
                href={`/events/${signup.event_id}/signups/${signup.id}`}
                className="text-xl"
              >
                {signup.name}
              </Link>
              <VolunteerRoles volunteerRoles={volunteerRoles} signup={signup} />
            </div>
            <div className="w-31">
              <CheckedInAt
                id={Number(signup.event_id)}
                signup={signup}
                signupId={Number(signup.id)}
              />
            </div>
          </div>
          <div>
            {signup.notes && <b>Notes from volunteer: </b>}
            {signup.notes}
          </div>
        </Card>
      ))}
    </>
  ) : (
    <p>No signups yet</p>
  );
};
