const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    /*
    let like_count = 0
    blogs.forEach((blog) => {
        like_count += blog.likes
    })
    return like_count
    */
   return blogs.reduce((acc, post) => {
    return acc + post.likes
   }, 0)
}

const favouriteBlog = ( blogs ) => {
    const max = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes ? prev : current )
    })
    return max
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}