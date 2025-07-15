import { test, describe, beforeEach, expect } from '@playwright/test'

const baseUrl = 'http://localhost:3003'
describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post(`${baseUrl}/api/testing/reset`)

    //Create a new User

    await request.post(`${baseUrl}/api/users`, {
      data: {
        name: 'New USer',
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
    await expect(page.getByrole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('Succeeds with right deatails', async ({ page }) => {
      await page.getByTestId
    })
  })
})
