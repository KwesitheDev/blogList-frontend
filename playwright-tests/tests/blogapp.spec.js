import { test, describe, beforeEach, expect } from '@playwright/test'

const baseUrl = 'http://localhost:3003'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post(`${baseUrl}/api/testing/reset`)

    // Create a new User
    await request.post(`${baseUrl}/api/users`, {
      data: {
        name: 'New User',
        username: 'newUser',
        password: 'password'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('login-form')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('Succeeds with right details', async ({ page }) => {
      await page.getByTestId('username').fill('newUser')
      await page.getByTestId('password').fill('password')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.locator('text=New User logged in')).toBeVisible()
    })

    test('Fails with wrong details', async ({ page }) => {
      await page.getByTestId('username').fill('newUser')
      await page.getByTestId('password').fill('NOTpassword')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong username or password')).toBeVisible()
      await expect(page.locator('text=New User logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('newUser')
      await page.getByTestId('password').fill('password')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.locator('text=New User logged in')).toBeVisible()

      // Create an initial blog for like/delete tests
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholder('Title').fill('My first blog')
      await page.getByPlaceholder('Author').fill('Author Name')
      await page.getByPlaceholder('URL').fill('http://example.com')
      await page.getByRole('button', { name: 'save' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholder('Title').fill('Second Blog')
      await page.getByPlaceholder('Author').fill('Another Author')
      await page.getByPlaceholder('URL').fill('http://another.com')
      await page.getByRole('button', { name: 'save' }).click()

      await expect(
        page.locator('text=Second Blog Another Author')
      ).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      const likeButton = page.getByRole('button', { name: 'like' })

      await likeButton.click()
      await expect(page.locator('text=likes 1')).toBeVisible()
    })

    test('user who created a blog can delete it', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()

      await page.evaluate(() => {
        window.confirm = () => true
      })

      await page.getByRole('button', { name: 'remove' }).click()
      await expect(
        page.locator('text=My first blog Author Name')
      ).not.toBeVisible()
    })

    test('only creator sees delete button', async ({ page, request }) => {
      await page.getByRole('button', { name: 'logout' }).click()

      await request.post(`${baseUrl}/api/users`, {
        data: {
          name: 'Other User',
          username: 'otherUser',
          password: 'password'
        }
      })

      await page.getByTestId('username').fill('otherUser')
      await page.getByTestId('password').fill('password')
      await page.getByRole('button', { name: 'login' }).click()

      await page.getByRole('button', { name: 'view' }).click()
      await expect(
        page.getByRole('button', { name: 'remove' })
      ).not.toBeVisible()
    })

    test('blogs are ordered by likes in descending order', async ({ page }) => {
      // Create Blog One
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholder('Title').fill('Blog One')
      await page.getByPlaceholder('Author').fill('Author One')
      await page.getByPlaceholder('URL').fill('http://blogone.com')
      await page.getByRole('button', { name: 'save' }).click()

      // Create Blog Two
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholder('Title').fill('Blog Two')
      await page.getByPlaceholder('Author').fill('Author Two')
      await page.getByPlaceholder('URL').fill('http://blogtwo.com')
      await page.getByRole('button', { name: 'save' }).click()

      // Like Blog Two twice
      const blogTwo = page.locator('.blog:has-text("Blog Two")')
      await blogTwo.getByRole('button', { name: 'view' }).click()
      const likeTwo = blogTwo.getByRole('button', { name: 'like' })
      await likeTwo.click()
      await likeTwo.click()

      // Like Blog One once
      const blogOne = page.locator('.blog:has-text("Blog One")')
      await blogOne.getByRole('button', { name: 'view' }).click()
      const likeOne = blogOne.getByRole('button', { name: 'like' })
      await likeOne.click()

      // Wait for like counts to update
      await page.waitForTimeout(500)

      // Verify order: Blog Two should come before Blog One
      const blogTitles = await page.locator('.blog').allTextContents()
      expect(blogTitles[0]).toContain('Blog Two')
      expect(blogTitles[1]).toContain('Blog One')
    })
  })
})
