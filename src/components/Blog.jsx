import {useState} from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, onLike, onDelete, user}) => {
  const [showDetails, setShowDetails] = useState(false)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = ()=> setShowDetails(!showDetails)

  const handleLike = async () => {
    const updatedBlog = {
      user: blog.user.id || blog.user, 
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    onLike(returnedBlog)
  }

  const handleDelete = () => {
    if (window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)) {
      onDelete(blog.id)
    }
  }

  const isOwner = user && blog.user && (blog.user.username === user.username)

    
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>

      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {isOwner && <button onClick={handleDelete}>remove</button>}
        </div>
      )}
    </div>
  )
}

export default Blog