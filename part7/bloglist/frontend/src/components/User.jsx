const User = ({ user_data }) => {
  return (
    <tr>
      <td>{user_data.username}</td>
      <td>{user_data.blogs.length}</td>
    </tr>
  );
};

export default User;
