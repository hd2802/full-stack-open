import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import storageService from "./services/storage";

import Notification from "./components/Notification";

import { initialiseBlogs, addNewBlog } from "./reducers/blogReducer";
import { setUser, removeUser, restoreUser } from "./reducers/loginReducer";
import { initialiseUsers } from "./reducers/userReducer";

import Blogs from "./pages/Blogs";
import Users from "./pages/Users";
import UserBlogs from "./pages/UserBlogs"

const App = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = storageService.loadUser();
    if (loggedUserJSON) {
      dispatch(restoreUser(loggedUserJSON));
    }
  }, []);

  const users = useSelector((state) => state.users);

    useEffect(() => {
      dispatch(initialiseUsers());
    }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    await dispatch(setUser({ username, password }));
    setUsername("");
    setPassword("");
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    await dispatch(removeUser());
  };

  return (
    <div>
      <Notification />

      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>
                username
                <input
                  type="text"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                password
                <input
                  type="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </label>
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<Users users={users}/>} />
            <Route path="/users/:id" element={<UserBlogs users={users} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
