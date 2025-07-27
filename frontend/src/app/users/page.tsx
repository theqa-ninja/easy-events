import { getUsers } from "@/app/user/users.service";

const UsersPage = async () => {
  const users = await getUsers();

  console.log("Users Data:", users);

  return (
    <div>
      <h1>Users Page</h1>
      <p>This is the users page where you can view all users as an Admin.</p>
      {users && users.length > 0 ? (
        users.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone_number}</p>
            <p>Is over 18?: {user.is_over_18 ? "Yes" : "No"}</p>
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UsersPage;
