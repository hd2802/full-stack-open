import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [viewAllDetails, setViewAllDetails] = useState(false)

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}<button onClick={() => setViewAllDetails(true)}>view all details</button>

      {viewAllDetails && (
        <div>
        {blog.url}
        <br></br>
        likes: {blog.likes} <button>like</button>
        </div>
      )}
    </div>  
  )
}

export default Blog