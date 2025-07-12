import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
import { expect, test, vi} from 'vitest'

test('renders blog title and author but not url or likes by default', () => {
  const blog = {
    title: 'Testing react Apps',
    author: 'Kwesithedev',
    url: 'somelink.com',
    likes: 7,
    user: {
      username: 'test',
      name: 'Test name'
    }
  }
  render(<Blog blog={blog} />)

  const titleAuthor = screen.getByTestId('blog-title-author')
  expect(titleAuthor).toHaveTextContent('Testing react Apps')
  expect(titleAuthor).toHaveTextContent('Kwesithedev')

  const details = screen.queryByTestId('blog-details')
  expect(details).not.toBeInTheDocument()
})

test('shows url and likes when the view button is clicked', () => {
  const blog = {
    title: 'Testing react Apps',
    author: 'Kwesithedev',
    url: 'somelink.com',
    likes: 7,
    user: {
      username: 'test',
      name: 'Test name'
    }
  }
  render(<Blog blog={blog} />)

  expect(screen.queryByTestId('blog-details')).not.toBeInTheDocument()

  const button = screen.getByTestId('toggle-btn')
  fireEvent.click(button)

  const details = screen.queryByTestId('blog-details')
  expect(details).toHaveTextContent(blog.url)
  expect(details).toHaveTextContent(`likes ${blog.likes}`)
})
//used fireEvent instead since i find that more efficient

test('shows url and likes when the view button is clicked', () => {
  const blog = {
    title: 'Testing react Apps',
    author: 'Kwesithedev',
    url: 'somelink.com',
    likes: 7,
    user: {
      username: 'test',
      name: 'Test name'
    }
  }

  const mockLikeHandler = vi.fn()
  render(<Blog blog={blog} onLike={mockLikeHandler} />)

  const button = screen.getByTestId('toggle-btn')
  fireEvent.click(button)

  const likeButton = screen.getByTestId('like-btn')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockLikeHandler).toHaveBeenCalled(2)
})
