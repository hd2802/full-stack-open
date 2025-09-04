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

const favouriteBlog = (blogs) => {
    const fav = blogs.reduce(function(prev, current) { 
        return (prev && prev.likes > current.likes) ? prev : current
    })

    return fav
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}