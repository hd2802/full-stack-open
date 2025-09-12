import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";

import { initialiseBlogs, addNewBlog } from "../reducers/blogReducer";

const Blogs = () => {
  const dispatch = useDispatch();

  const [viewBlogForm, setViewBlogForm] = useState(false);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, []);

  const user = useSelector((state) => state.user);

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
      <h2>blogs</h2>
      {!viewBlogForm && (
        <button onClick={() => setViewBlogForm(true)}>create new blog</button>
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
  );
};

export default Blogs;
