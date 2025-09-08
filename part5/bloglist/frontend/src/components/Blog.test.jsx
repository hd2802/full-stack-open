import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const user = {
  name: "user",
  username: "user"
}

const blog = {
  title: "test title",
  author: "test author",
  url: "http://test.com",
  likes: 5,
  // need an id field for addLike to work
  user: { id: "123" } 
}

describe('Blog component', () => {
    let mockUpdateLikes
    let mockDeleteBlog

    beforeEach(() => {
        mockUpdateLikes = vi.fn()
        mockDeleteBlog = vi.fn()
    })

    test('renders title and author, but not url or likes by default', () => {
        const { container } = render(
            <Blog blog={blog} updateLikes={mockUpdateLikes} user={user} deleteBlog={mockDeleteBlog} />
        )

        const header = container.querySelector('.blog-header')
        expect(header).toHaveTextContent('test title test author')

        const details = container.querySelector('.blog-details')
        expect(details).toBeNull()
    })

    test('displays url and likes after clicking the view button', async () => {
        const userSim = userEvent.setup()

        render(
            <Blog blog={blog} updateLikes={mockUpdateLikes} user={user} deleteBlog={mockDeleteBlog} />
        )

        const button = screen.getByText('view')
        await userSim.click(button)

        expect(screen.getByText('http://test.com')).toBeDefined()
        expect(screen.getByText(/likes: 5/)).toBeDefined()
    })

    test('clicking the like button twice calls the event handler twice', async() => {
        const userSim = userEvent.setup()

        render(
            <Blog blog={blog} updateLikes={mockUpdateLikes} user={user} deleteBlog={mockDeleteBlog} />
        )

        const button = screen.getByText('view')
        await userSim.click(button)

        const likeButton = screen.getByText('like')
        await userSim.click(likeButton)
        await userSim.click(likeButton)

        expect(mockUpdateLikes).toHaveBeenCalledTimes(2)
        
    })
})