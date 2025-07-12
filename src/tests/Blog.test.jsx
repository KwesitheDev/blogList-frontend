import React from 'react'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import { expect } from 'vitest'

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
