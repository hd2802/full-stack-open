import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import BlogForm from './components/BlogForm'

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [viewBlogForm, setViewBlogForm] = useState(false)

  const sortBlogs = (blogA, blogB) => {
    if(blogA.likes > blogB.likes) {
      return -1
    } else if (blogA.likes < blogB.likes) {
      return 1
    }
    return 0
  }

  const deleteBlog = async (blogId) => {
    await blogService.remove(blogId)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(sortBlogs) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

      setSuccessMessage('Logged in')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch (error) {
      console.log('Login failed:', error.response?.data || error.message)

      setErrorMessage(
        `wrong username or password`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      setUser(null)
      window.localStorage.removeItem('loggedBlogappUser')

      setSuccessMessage('Logged out')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch (error) {
      console.log('Logout failed:', error.response?.data || error.message )

      setErrorMessage(
        `Logout failed`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  const createBlog = async (event) => {
    event.preventDefault()

    try {
      const newObject = {
        title: title,
        author: author,
        url: url
      }

      const returnedBlog = await blogService.create(newObject)
      setBlogs(blogs.concat(returnedBlog).sort(sortBlogs))

      setSuccessMessage(`${title} by ${author} added`)

      setTitle('')
      setAuthor('')
      setUrl('')

      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      setViewBlogForm(false)

      blogs.sort((a,b) => a.likes - b.likes)

    } catch (error) {
      console.log('Login failed:', error.response?.data || error.message)

      setErrorMessage(
        `Failed to add new blog`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  const addLike = async (blogId, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(blogId, updatedBlog)
      
      // updates all fields and saves them, even if not changing the,
      setBlogs(blogs.map(b => 
        b.id === blogId ? { ...b, ...returnedBlog } : b
      ).sort(sortBlogs))

      blogs.sort((a,b) => a.likes - b.likes)

    } catch (error) {
      console.error('Failed to update blog likes:', error)
    }
  }


  if(user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
                <input type="text" value={username} onChange={( { target }) => setUsername(target.value)}
                />
            </label>
          </div>
          <div>
            <label>
              password
                <input type="password" value={password} onChange={( { target }) => setPassword(target.value)}
                />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <p>
        {user.username} logged in 
        <button onClick={handleLogout}>
          logout
        </button>
      </p>
      {!viewBlogForm && (
      <button onClick={() => setViewBlogForm(true)}>
        create new blog
      </button>
      )}
      {viewBlogForm && (
        <div>
          <BlogForm
          createBlog={createBlog} />

          <button onClick={() => setViewBlogForm(false)}>cancel</button>
        </div>
      )}
      {blogs.map(blog => 
        <Blog key={blog.id} 
          blog={blog} 
          user={user} 
          addLike={addLike}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default App