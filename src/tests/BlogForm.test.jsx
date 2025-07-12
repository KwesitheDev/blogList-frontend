import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'
import { vi, expect, test } from 'vitest'

test('calls onCreate with correct details when new blog is submitted', () => {
  const mockCreateHandler = vi.fn()

  render(<BlogForm onCreate={mockCreateHandler} />)

  const titleInput = screen.getByTestId('title-input')
  const authorInput = screen.getByTestId('author-input')
  const urlInput = screen.getByTestId('url-input')
  const submitButton = screen.getByTestId('submit-btn')

  fireEvent.change(titleInput, { target: { value: 'React Testing' } })
  fireEvent.change(authorInput, { target: { value: 'Kwesithedev' } })
  fireEvent.change(urlInput, { target: { value: 'http://test.com' } })

  fireEvent.click(submitButton)

  expect(mockCreateHandler).toHaveBeenCalledTimes(1)
  expect(mockCreateHandler).toHaveBeenCalledWith({
    title: 'React Testing',
    author: 'Kwesithedev',
    url: 'http://test.com'
  })
})
