import { useState } from 'react'

const Blog = ({ blog, updateLikes, user, deleteBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  //console.log(blog.id)

  const addLike = async () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    await updateLikes(blog.id, blogObject)
  }

  const removeBlog = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await deleteBlog(blog.id)
    }
  }

  const [viewAllDetails, setViewAllDetails] = useState(false)

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}<button onClick={() => setViewAllDetails(true)}>view all details</button>

      {viewAllDetails && (
        <div>
        {blog.url}
        <br></br>
        likes: {blog.likes} 
        <button onClick={addLike}>like</button>
        <br></br>
        {user.username}
        <br></br>
        <button onClick={removeBlog}>remove</button>
        </div>
      )}
    </div>  
  )
}

export default Blog