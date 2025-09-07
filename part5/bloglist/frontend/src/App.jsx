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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  console.log(user)

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

    if(title === '' || author === '' || url === '') {
      return
    }

    try {
      const newObject = {
        title: title,
        author: author,
        url: url
      }

      const returnedBlog = await blogService.create(newObject)
      setBlogs(blogs.concat(returnedBlog))

      setSuccessMessage(`${title} by ${author} added`)

      setTitle('')
      setAuthor('')
      setUrl('')

      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      setViewBlogForm(false)

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

  const updateLikes = async (blogId, newBlogObject) => {
    try {
      const updatedBlog = await blogService.update(blogId, newBlogObject)

      setBlogs(blogs.map(blog => {
          return blog.id === updatedBlog.id ? updatedBlog : blog
        }
      ))
    } catch (error) {
      console.log(error)
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
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} user={user}/>
      )}
    </div>
  )
}

export default App