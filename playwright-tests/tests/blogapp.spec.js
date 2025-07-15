import {test, describe, beforeEach, expect} from ('@playwright/test')

describe('Blog app', ()=>{
    beforeEach(
        async ({ page }) => {
            await page.goto('http://localhost:5173')
        }
    )


    test('Login form is shown', async ({ page }) => {
        await expect(page.getByTestId('login-form')).toBeVisible()  
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByrole('button',{name:'login'})).toBeVisible()
    })
})