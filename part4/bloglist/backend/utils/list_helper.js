const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    var count = 0
    blogs.forEach(blog => {
        count += blog.likes
    })
    return count
}

module.exports = {
    dummy,
    totalLikes
}