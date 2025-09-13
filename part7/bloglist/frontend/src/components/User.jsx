import { Link } from "react-router-dom";

const User = ({ user_data }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${user_data.id}`}>{user_data.username}</Link>
      </td>
      <td>{user_data.blogs.length}</td>
    </tr>
  );
};

export default User;
