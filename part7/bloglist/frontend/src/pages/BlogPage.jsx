import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addLike } from "../reducers/blogReducer"

const BlogPage = ({ blogs }) => {
    const dispatch = useDispatch();
    const id = useParams().id

    const blog = blogs.find(b => b.id === id)

    const updateLikes = () => {
        dispatch(addLike(blog))
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
        </div>
    )  
}

export default BlogPage