import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react"
import { addLike } from "../reducers/blogReducer"

const BlogPage = ({ blogs }) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = blogs.find(b => b.id === id);

  const [comment, setComment] = useState('')

  const updateLikes = () => {
    dispatch(addLike(blog));
  }

  if (!blog) {
    return <div>Loading blog...</div>;
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
        <form>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button type="submit"></button>
        </form>
        {blog.comments && (
          <ul>
            {blog.comments.map(comment => 
              <li key={comment.id}>{comment.content}</li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default BlogPage;