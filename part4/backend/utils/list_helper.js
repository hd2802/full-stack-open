const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {

    const total = blogs.reduce((total, blog) => {
            return blog.likes + total
        }, 0)
    return total
}

module.exports = {
    dummy,
    totalLikes
}