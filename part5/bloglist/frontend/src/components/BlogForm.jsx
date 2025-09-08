import { useState } from 'react'

const BlogForm = ({
  createBlog
}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const create = (event) => {
    event.preventDefault()
    
    if(title === '' || author === '' || url === '') {
      return
    }
    createBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <div>
        <form onSubmit={create}>
          <div>
            <label>
              title:
              <input type="text" value={title} onChange={ ({ target }) => setTitle(target.value) } />
            </label>
          </div>
          <div>
            <label>
              author:
              <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
            </label>
          </div>
          <div>
            <label>
              url:
              <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
            </label>
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </div>
  )
}

export default BlogForm