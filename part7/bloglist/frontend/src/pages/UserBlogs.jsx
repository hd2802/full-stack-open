import { useParams } from "react-router-dom";
import Blog from "../components/Blog"

const UserBlogs = ({ users }) => {
    const id = useParams().id

    if (!users || users.length === 0) {
        return <div>Loading user data...</div>;
    }

    // DONT need to convert to a Number here as user ids are UUID
    const user = users.find(u => u.id === id )

    if(!user) {
        return null
    }

    return (
        <div>
            <h2>{user.username}'s Blogs</h2>
            {user.blogs.map(blog => 
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )

}

export default UserBlogs