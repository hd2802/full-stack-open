import User from "../components/User";
import { Table } from "react-bootstrap";

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
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
      </Table>
    </div>
  );
};

export default Users;
