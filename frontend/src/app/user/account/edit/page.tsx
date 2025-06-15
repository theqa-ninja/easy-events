import { getUser } from "../../users.service";
import { AccountForm } from "./AccountForm";

export const metadata = {
  title: "Edit Account",
};

const EditAccount = async () => {
  const user = await getUser();

  return (
    <main className="p-4 max-w-4xl m-auto">
      <h1>Edit Account</h1>
      {user ? (
        <AccountForm user={user} />
      ) : (
        <p>
          You need to log in to edit your account.
        </p>
      )}
    </main>
  );
};

export default EditAccount;
