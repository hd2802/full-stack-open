import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import blogService from "./services/blogs";
import loginService from "./services/login";
import storageService from './services/storage'

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

import { initialiseBlogs, addNewBlog } from "./reducers/blogReducer";
import { setUser, removeUser } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [viewBlogForm, setViewBlogForm] = useState(false);

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = storageService.loadUser()
    if (loggedUserJSON) {
      const user = loggedUserJSON
      dispatch(setUser(user));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    await dispatch(setUser({ username, password }))
    setUsername("");
    setPassword("");
  };

  const handleLogout = async (event) => {
    event.preventDefault()
    await dispatch(removeUser())
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
