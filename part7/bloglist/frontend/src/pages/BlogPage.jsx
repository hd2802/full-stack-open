import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addLike, addComment } from "../reducers/blogReducer";

const BlogPage = ({ blogs }) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = blogs.find(b => b.id === id);
  const [comment, setComment] = useState('');

  const updateLikes = () => {
    dispatch(addLike(blog));
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (comment.trim()) {
      dispatch(addComment(id, comment));
      setComment(''); // Clear the form after submission
    }
  };

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <p>{blog.url}</p>
      <p>{blog.likes} likes
        <button onClick={() => updateLikes()}>
          like
        </button>
      </p>
      <p>added by {blog.user.username}</p>
      
      <div>
        <h3>comments</h3>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        
        <form onSubmit={handleCommentSubmit}>
          <div>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              required
            />
          </div>
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  );
};

export default BlogPage;