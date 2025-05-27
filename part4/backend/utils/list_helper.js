const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.reduce((acc, blog) => {
        return acc + blog.likes
    }, 0)
    return likes
}

module.exports = {
    dummy,
    totalLikes
}