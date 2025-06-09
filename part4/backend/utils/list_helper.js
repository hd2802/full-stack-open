const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((total, blog) => {
            return blog.likes + total
        }, 0)
    return total
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const favourite = blogs.reduce(
        (favourite, blog) => {
            return favourite.likes > blog.likes ? favourite : blog
        }
    )
    // console.log(favourite)
    return favourite
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}