const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.reduce((acc, blog) => {
        return acc + blog.likes
    }, 0)
    return likes
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    else {
        const blog = blogs.reduce((favourite, current) => {
            return favourite.likes > current.likes ? favourite : current
        })
        return { title : blog.title, author : blog.author, likes : blog.likes }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}