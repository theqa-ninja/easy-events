import { getSignupsSignup } from "@/app/events/[id]/signups.service";
import { CancelledAt } from "../CanceledAt";
import Link from "next/link";
import { CheckedInAt } from "../CheckedInAt";
import { Card } from "@/app/components/Card";

const SignupsShowPage = async ({
  params,
}: {
  params: Promise<{ id: number; signupId: number }>;
}) => {
  const { id, signupId } = await params;
  const signupData = await getSignupsSignup(id, signupId);

  return (
    <Card>
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
          <div className="flex flex-col min-w-25">
            <CheckedInAt id={id} signup={signupData} signupId={signupId} />
            <CancelledAt id={id} signup={signupData} signupId={signupId} />
          </div>
        </div>
      )}
    </Card>
  );
};

export default SignupsShowPage;
