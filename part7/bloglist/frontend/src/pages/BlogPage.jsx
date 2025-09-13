import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addLike, addComment } from "../reducers/blogReducer"

const BlogPage = ({ blogs }) => {
    const dispatch = useDispatch();
    const id = useParams().id

    const [comment, setComment] = useState('')

    const blog = blogs.find(b => b.id === id)

    if(!blog) {
        return <div>loading...</div>
    }

    const updateLikes = () => {
        dispatch(addLike(blog))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(comment === "") {
            return
        }
        dispatch(addComment(blog, comment))
        setComment('')
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
            <h3>comments</h3>
            <form onSubmit={handleSubmit}>
                 <input 
                    type="text"
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                />
                <button type="submit">add comment</button>
            </form>
            <ul>
                {/** This works for adding a key as the comments are static and cannot be deleted/reordered */}
                {blog.comments.map((com, index) => 
                    <li key={index}>{com}</li>
                )}
            </ul>
        </div>
    )  
}

export default BlogPage