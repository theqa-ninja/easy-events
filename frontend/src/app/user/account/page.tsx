import Link from "next/link";
import { getUser } from "../users.service";

export const metadata = {
  title: "Account",
};

const AccountPage = async () => {
  const user = await getUser();

  return (
    <>
      <h1>Account</h1>
      {user ? (
        <>
          <dl>
            <dl>
              <dt>Name:</dt>
              <dd>{user?.name}</dd>
            </dl>
            <dl>
              <dt>Email:</dt>
              <dd>{user?.email}</dd>
            </dl>
            <dl>
              <dt>Phone number:</dt>
              <dd>{user?.phone_number}</dd>
            </dl>
            <dl>
              <dt>Is over 18:</dt>
              <dd>{user?.is_over_18 ? "Yes" : "No"}</dd>
            </dl>
          </dl>
          <Link href="/user/account/edit" className="mt-5 inline-block">
            Edit account details &raquo;
          </Link>
        </>
      ) : (
        <p>You need to log in to view your account.</p>
      )}
    </>
  );
};

export default AccountPage;
