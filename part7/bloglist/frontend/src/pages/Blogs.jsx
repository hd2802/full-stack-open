import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";

import { initialiseBlogs, addNewBlog } from "../reducers/blogReducer";

import { Button } from "react-bootstrap"

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
      {!viewBlogForm && (
        <Button onClick={() => setViewBlogForm(true)}>create new blog</Button>
      )}
      {viewBlogForm && (
        <div>
          <BlogForm createBlog={createBlog} />

          <Button onClick={() => setViewBlogForm(false)}>cancel</Button>
        </div>
      )}

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default Blogs;
