import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import blogService from "./services/blogs";
import loginService from "./services/login";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

import { createNotification } from "./reducers/notificationReducer";
import { initialiseBlogs, addNewBlog, addLike } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [viewBlogForm, setViewBlogForm] = useState(false);

  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");

      dispatch(createNotification("Logged in successfully", "success"));
    } catch (error) {
      dispatch(createNotification("Login failed, please try again", "error"));
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      setUser(null);
      window.localStorage.removeItem("loggedBlogappUser");

      dispatch(createNotification("Logged out successfully", "success"));
    } catch (error) {
      console.log("Logout failed:", error.response?.data || error.message);

      dispatch(createNotification("Logout failed, please try again", "error"));
    }
  };

  const createBlog = async (title, author, url) => {
    const newObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    };
    dispatch(addNewBlog(newObject));
    setViewBlogForm(false);
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
          {!viewBlogForm && (
            <button onClick={() => setViewBlogForm(true)}>
              create new blog
            </button>
          )}
          {viewBlogForm && (
            <div>
              <BlogForm createBlog={createBlog} />

              <button onClick={() => setViewBlogForm(false)}>cancel</button>
            </div>
          )}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
