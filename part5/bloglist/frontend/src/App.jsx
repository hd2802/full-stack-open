import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
    } catch (error) {
      console.log('Login failed:', error.response?.data || error.message)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      setUser(null)
      window.localStorage.removeItem('loggedBlogappUser')
    } catch (error) {
      console.log('Logout failed:', error.response?.data || error.message )
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

      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (error) {
      console.log('Login failed:', error.response?.data || error.message)
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
      <p>
        {user.username} logged in 
        <button onClick={handleLogout}>
          logout
        </button>
      </p>
      <div>
        <form onSubmit={createBlog}>
          <div>
            <label>
              title:
                <input type="text" value={title} onChange={( { target } ) => setTitle(target.value)} />
            </label>
          </div>
          <div>
            <label>
              author:
                <input type="text" value={author} onChange={( { target } ) => setAuthor(target.value)} />
            </label>
          </div>
          <div>
            <label>
              url:
                <input type="text" value={url} onChange={( { target } ) => setUrl(target.value)} />
            </label>
          </div>
          <button type="submit">create</button>
        </form>
      </div>
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App