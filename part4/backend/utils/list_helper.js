const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let like_count = 0
    blogs.forEach((blog) => {
        like_count += blog.likes
    })
    return like_count
}

module.exports = {
    dummy,
    totalLikes
}