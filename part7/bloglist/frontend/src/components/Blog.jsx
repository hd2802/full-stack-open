import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLike, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  //console.log(blog.id)

  const updateLikes = () => {
    dispatch(addLike(blog));
  };

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
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
            <button onClick={updateLikes}>like</button>
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
