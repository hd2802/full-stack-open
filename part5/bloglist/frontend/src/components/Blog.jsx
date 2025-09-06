import { useState } from 'react'

const Blog = ({ blog, user, addLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [viewAllDetails, setViewAllDetails] = useState(false)

  const incrementLikes = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user._id
    }

    await addLike(blog.id, updatedBlog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}<button onClick={() => setViewAllDetails(!viewAllDetails)}>{
        viewAllDetails
          ? `hide`
          : `view`}</button>

      {viewAllDetails && (
        <div>
        {blog.url}
        <br></br>
        likes: {blog.likes} <button onClick={incrementLikes}>like</button>
        <br></br>
        {user.username}
        </div>
      )}
    </div>  
  )
}

export default Blog