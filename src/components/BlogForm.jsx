import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const handleSubmit = (e) => {
    e.preventDefault()

    addBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogVisible(false)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogVisible(true)}>create</button>
      </div>

      <div style={showWhenVisible}>
        <form onSubmit={handleSubmit}>
          <div>
            title
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
        <button onClick={() => setBlogVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default BlogForm
