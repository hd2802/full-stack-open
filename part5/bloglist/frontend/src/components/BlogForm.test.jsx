import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form calls event handler with correct arguments', async () => {
    const createBlog = vi.fn()
    const userSim = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByLabelText(/title:/i)
    const authorInput = screen.getByLabelText(/author:/i)
    const urlInput = screen.getByLabelText(/url:/i)

    await userSim.type(titleInput, 'React testing')
    await userSim.type(authorInput, 'John Smith')
    await userSim.type(urlInput, "http://reacttesting.com")

    const submitButton = screen.getByText('create')
    await userSim.click(submitButton)

    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog).toHaveBeenCalledWith(
    'React testing',
    'John Smith',
    'http://reacttesting.com'
  )
})