import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from  './services/login'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  //show Notification
  const showNotification = (message, type = 'success') => {
  setNotification({ message, type })
  setTimeout(() => {
    setNotification(null)
  }, 5000)
  }


  //handle logout 
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  //handle login
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password }) 

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))  
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('Wrong credentials', 'error')
    }
  }

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const handleAuthorChange = (e) => setAuthor(e.target.value)

  const handleTitleChange = (e) => setTitle(e.target.value)

  //handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const newBlog = {
        title, author,url
      }

      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))

      setTitle('')
      setAuthor('')
      setUrl('')
      showNotification(`A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`)
    } catch(exception) {
      console.log(exception)
      showNotification('Failed to create blog', 'error')
    }

  }


  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />

        <Login 
        
        handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
      </div>
      
    )
  }

  return (
    <div>
      <Notification notification={notification} />

      <h2>blogs</h2>
      <p>{user.name}
        logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm handleSubmit={handleSubmit} handleAuthorChange={handleAuthorChange}
        handleTitleChange={handleTitleChange} handleUrlChange={handleUrlChange} 
        title={title} url={url} author={author}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App