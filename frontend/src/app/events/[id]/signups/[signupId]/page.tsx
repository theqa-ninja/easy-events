import { getSignupsSignup } from "@/app/events/events.service";

const SignupsShowPage = async ({
  params,
}: {
  params: Promise<{ id: number; signupId: number }>;
}) => {
  const { id, signupId } = await params;
  const signupData = await getSignupsSignup(id, signupId);
  console.log(signupData);

  return (
    <main className="p-4 max-w-4xl m-auto">
      <h1>Signup</h1>
      {signupData &&
        <div>
          <p>Name: {signupData.user_name}</p>
          <p>Email: {signupData.user_email}</p>
          <p>Phone number: {signupData.user_phone_number}</p>
          <p>Notes: {signupData.notes}</p>
        </div>
      }
    </main>
  );
};

export default SignupsShowPage;
