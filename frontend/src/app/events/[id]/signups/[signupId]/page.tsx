import { getSignupsSignup } from "@/app/events/[id]/signups.service";
import { CanceledAt } from "./CanceledAt";
import Link from "next/link";
import { CheckedInAt } from "../CheckedInAt";

const SignupsShowPage = async ({
  params,
}: {
  params: Promise<{ id: number; signupId: number }>;
}) => {
  const { id, signupId } = await params;
  const signupData = await getSignupsSignup(id, signupId);

  return (
    <main className="p-4 max-w-4xl m-auto">
      <Link href={`/events/${id}/signups`}>&lsaquo;&nbsp;Back to signups</Link>
      <h1>Signup</h1>
      {signupData && (
        <div>
          <dl>
            <dt>Name:</dt>
            <dd>{signupData.name}</dd>
          </dl>
          <dl>
            <dt>Email:</dt>
            <dd>{signupData.email}</dd>
          </dl>
          <dl>
            <dt>Phone number:</dt>
            <dd>{signupData.phone_number}</dd>
          </dl>
          <dl>
            <dt>Notes from volunteer:</dt>
            <dd>{signupData.notes}</dd>
          </dl>
          <dl>
            {/* TODO: add leader notes param when it's available */}
            <dt>Notes from leader:</dt>
            <dd></dd>
          </dl>
          <dl className="flex flex-col">
            <dt>Checked-in at:</dt>
            <dd className="min-w-25 align-top">
              <CheckedInAt id={id} signup={signupData} signupId={signupId} />
            </dd>
          </dl>
          <dl className="flex flex-col">
            <dt>Cancelled at:</dt>
            <dd className="min-w-25 align-top">
              <CanceledAt id={id} signup={signupData} signupId={signupId} />
            </dd>
          </dl>
        </div>
      )}
    </main>
  );
};

export default SignupsShowPage;
