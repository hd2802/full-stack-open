const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const result = blogs.reduce((acc, blog) => {
        return acc + blog.likes
    }, 0 )
    return result
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {return null}
    const favouriteBlog = blogs.reduce((prev, current) => {
        return prev.likes > current.likes ? prev : current
    })
    return {
        title: favouriteBlog.title,
        author: favouriteBlog.author,
        url: favouriteBlog.url,
        likes: favouriteBlog.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}