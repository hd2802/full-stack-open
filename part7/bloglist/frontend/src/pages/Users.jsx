import User from "../components/User";

const Users = ({ users }) => {

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user_data) => (
            <User key={user_data.id} user_data={user_data} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
