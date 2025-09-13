import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

import storageService from "./services/storage";

import { initialiseBlogs } from "./reducers/blogReducer";
import { setUser, removeUser, restoreUser } from "./reducers/loginReducer";
import { initialiseUsers } from "./reducers/userReducer";

import Blogs from "./pages/Blogs";
import Users from "./pages/Users";
import UserBlogs from "./pages/UserBlogs";
import BlogPage from "./pages/BlogPage";

import { Form, Button, Navbar } from "react-bootstrap";

import Notification from "./components/Notification"

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

  const padding = {
    padding: 5,
  };

  if (!user) {
    return (
      <div className="container">
        <Notification />
        <h2>Log in to application</h2>
        
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>
              username
              <Form.Control
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              password
              <Form.Control
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </Form.Label>
          </Form.Group>
          <Button type="submit">login</Button>
        </Form>
      </div>
    );
  }

  return (
    <div className="container">
      <Notification />
      <h2>Blogs</h2>
      
      <Navbar bg="light" variant="light">
        <Link to="/" style={padding}>
          Home
        </Link>
        <Link to="/users" style={padding}>
          Blogs
        </Link>
          {user.username} Logged in
          <Button onClick={handleLogout} style={padding}>logout</Button>
      </Navbar>

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<UserBlogs users={users} />} />
        <Route path="/blogs/:id" element={<BlogPage blogs={blogs} />} />
      </Routes>
    </div>
  );
};

export default App;
