import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addLike } from "../reducers/blogReducer"

const BlogPage = ({ blogs }) => {
    const dispatch = useDispatch();
    const id = useParams().id

    const blog = blogs.find(b => b.id === id)

    if(!blog) {
        return <div>loading...</div>
    }

    const updateLikes = () => {
        dispatch(addLike(blog))
    }

    // for generating a unique key for each blog post
    const generateId = () => {
        const max = blog.comments.length 
        return max + 1
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
            <ul>
                {blog.comments.map(com => 
                    <li key={generateId()}>{com}</li>
                )}
            </ul>
        </div>
    )  
}

export default BlogPage