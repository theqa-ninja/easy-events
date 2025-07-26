import { getUser } from "../../users.service";
import { AccountForm } from "./AccountForm";

export const metadata = {
  title: "Edit Account",
};

const EditAccount = async () => {
  const user = await getUser();

  return (
    <>
      <h1>Edit Account</h1>
      {user ? (
        <AccountForm user={user} />
      ) : (
        <p>
          You need to log in to edit your account.
        </p>
      )}
    </>
  );
};

export default EditAccount;
