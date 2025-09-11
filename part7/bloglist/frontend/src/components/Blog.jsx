import { useState } from "react";

const Blog = ({ blog, updateLikes, user, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  //console.log(blog.id)

  const addLike = async () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    await updateLikes(blog.id, blogObject);
  };

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await deleteBlog(blog.id);
    }
  };

  const [viewAllDetails, setViewAllDetails] = useState(false);

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-header">
        {blog.title} {blog.author}
        <button onClick={() => setViewAllDetails(!viewAllDetails)}>
          {viewAllDetails ? "hide" : "view"}
        </button>
      </div>

      {viewAllDetails && (
        <div className="blog-details">
          <div className="blog-url">{blog.url}</div>
          <br></br>
          <div className="blog-likes">
            likes: {blog.likes}
            <button onClick={addLike}>like</button>
          </div>
          <br></br>
          <div className="blog-user"> {user.username} </div>
          <br></br>
          <button onClick={removeBlog}>remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
