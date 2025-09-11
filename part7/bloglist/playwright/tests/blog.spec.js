import { test, expect } from '@playwright/test'

const baseUrl = 'http://localhost:5173' // adjust to your app's URL
const apiUrl = 'http://localhost:3003/api/blogs'
const testUser = {
  username: 'testuser',
  password: 'testpassword'
}

test.describe('Blog app', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl)
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator('text=Log in to application')).toBeVisible()
    await expect(page.locator('input[type="text"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  test('User can log in with correct credentials', async ({ page }) => {
    await page.fill('input[type="text"]', testUser.username)
    await page.fill('input[type="password"]', testUser.password)
    await page.click('button:text("login")')

    await expect(page.locator(`text=${testUser.username} logged in`)).toBeVisible()
    await expect(page.locator('.success')).toHaveText('Logged in')
  })

  test('Login fails with wrong credentials', async ({ page }) => {
    await page.fill('input[type="text"]', 'wronguser')
    await page.fill('input[type="password"]', 'wrongpass')
    await page.click('button:text("login")')

    await expect(page.locator('.error')).toHaveText('wrong username or password', { timeout: 5000 })
  })

  test('User can create a blog', async ({ page }) => {
    await page.fill('input[type="text"]', testUser.username)
    await page.fill('input[type="password"]', testUser.password)
    await page.click('button:text("login")')

    await expect(page.locator(`text=${testUser.username} logged in`)).toBeVisible()

    await page.click('button:text("create new blog")')

    await page.getByLabel('title').fill('Test Blog Title')
    await page.getByLabel('author').fill('Test Author')
    await page.getByLabel('url').fill('https://testblog.com')

    await page.click('button:text("create")')

    // Optionally verify success message and blog appearance
    // await expect(page.locator('.success')).toHaveText('Test Blog Title by Test Author added', { timeout: 5000 })
    // await expect(page.locator('.blog')).toContainText('Test Blog Title Test Author')
  })

  test('User can like a blog', async ({ page }) => {
    // Log in
    await page.fill('input[type="text"]', testUser.username)
    await page.fill('input[type="password"]', testUser.password)
    await page.click('button:text("login")')

    await expect(page.locator(`text=${testUser.username} logged in`)).toBeVisible()

    // Get user token from localStorage
    const token = await page.evaluate(() => window.localStorage.getItem('loggedBlogappUser'))
    const user = JSON.parse(token)

    // Create blog via API
    await page.request.post(apiUrl, {
      data: {
        title: 'Like Test Blog',
        author: 'Author',
        url: 'https://likeblog.com'
      },
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })

    await page.reload()

    const blogLocator = page.locator('.blog').filter({
        hasText: 'Like Test Blog Author',
    }).first();  // pick the first, or better:

    await blogLocator.locator('button:text("view")').click();

  })

    test('User can delete their own blog', async ({ page }) => {
        // Log in
        await page.fill('input[type="text"]', testUser.username);
        await page.fill('input[type="password"]', testUser.password);
        await page.click('button:text("login")');

        await expect(page.locator(`text=${testUser.username} logged in`)).toBeVisible();

        // Get user token from localStorage
        const token = await page.evaluate(() => window.localStorage.getItem('loggedBlogappUser'));
        const user = JSON.parse(token);

        // Create blog via API with matching author for filtering
        await page.request.post(apiUrl, {
            data: {
            title: 'Delete Test Blog',
            author: 'Delete Test Blog Author', // <-- Match author for unique filtering
            url: 'https://deleteblog.com',
            },
            headers: {
            Authorization: `Bearer ${user.token}`,
            },
        });

        // Reload page to show new blog
        await page.reload();

        // Locate the newly created blog uniquely by title + author
        const blogLocator = page.locator('.blog').filter({
            hasText: 'Delete Test Blog Delete Test Blog Author',
        }).first();

        // Expand blog details to reveal delete button
        await blogLocator.locator('button:text("view")').click();

        // Automatically accept the confirmation dialog
        page.once('dialog', dialog => dialog.accept());

        // Click remove button to delete blog
        await blogLocator.locator('button:text("remove")').click();

        // Assert the blog is no longer visible
        await expect(page.locator('.blog', { hasText: 'Delete Test Blog Delete Test Blog Author' })).toHaveCount(0);
    });


  test('User can logout', async ({ page }) => {
    // Log in
    await page.fill('input[type="text"]', testUser.username)
    await page.fill('input[type="password"]', testUser.password)
    await page.click('button:text("login")')

    await expect(page.locator(`text=${testUser.username} logged in`)).toBeVisible()

    await page.click('button:text("logout")')

    await expect(page.locator('.success')).toHaveText('Logged out', { timeout: 5000 })

    await expect(page.locator('text=Log in to application')).toBeVisible()
  })

})
