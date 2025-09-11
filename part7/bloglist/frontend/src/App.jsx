import { useState, useEffect } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

import { createNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch() 

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [viewBlogForm, setViewBlogForm] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort(blogSort)));
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

      dispatch(createNotification('Logged in successfully', 'success'))
    } catch (error) {
      dispatch(createNotification('Login failed, please try again', 'error'))
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      setUser(null);
      window.localStorage.removeItem("loggedBlogappUser");

      dispatch(createNotification('Logged out successfully', 'success'))
    } catch (error) {
      console.log("Logout failed:", error.response?.data || error.message);

      dispatch(createNotification('Logout failed, please try again', 'error'))
    }
  };

  const createBlog = async (event, title, author, url) => {
    event.preventDefault();

    try {
      const newObject = {
        title: title,
        author: author,
        url: url,
      };

      const returnedBlog = await blogService.create(newObject);
      setBlogs(blogs.concat(returnedBlog).sort(blogSort));

      dispatch(createNotification(`${title} by ${author} added`, 'success'))

      setViewBlogForm(false);
    } catch (error) {
      console.log("Login failed:", error.response?.data || error.message);

      dispatch(createNotification('Failed to add new blog', 'error'))
    }
  };

  const blogSort = (blogA, blogB) => {
    if (blogA.likes > blogB.likes) {
      return -1;
    } else if (blogA.likes < blogB.likes) {
      return 1;
    }
    return 0;
  };

  const updateLikes = async (blogId, newBlogObject) => {
    try {
      const updatedBlog = await blogService.update(blogId, newBlogObject);

      setBlogs(
        blogs
          .map((blog) => {
            return blog.id === updatedBlog.id ? updatedBlog : blog;
          })
          .sort(blogSort),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (blogId) => {
    await blogService.remove(blogId);

    setBlogs(
      blogs
        .filter((blog) => {
          return blog.id !== blogId;
        })
        .sort(blogSort),
    );
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
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={updateLikes}
              user={user}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
