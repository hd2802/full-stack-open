const { test, describe } = require('node:test')
const assert = require('node:assert')

// custom imports
const listHelper = require('../utils/list_helper')
const data = require('./test_data')

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy()
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog, equals the likes of that blog', () => {
        const result = listHelper.totalLikes(data.singleBlogList)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated correctly', () => {
        const result = listHelper.totalLikes(data.blogs)
        assert.strictEqual(result, 36)
    })
})

describe('favourite blog', () => {
    test('of empty list is the empty object', () => {
        const result = listHelper.favouriteBlog([])
        assert.deepStrictEqual(result, {})
    })

    test('when list has only one blog, equals that blog', () => {
        const single = data.singleBlogList[0]
        const result = listHelper.favouriteBlog(data.singleBlogList)
        assert.deepStrictEqual(result, {
            title : single.title,
            author : single.author,
            likes : single.likes
        })
    })

    test('of a bigger list is returned correctly', () => {
        /*
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12
        */
       const most_likes = {
        title : 'Canonical string reduction',
        author : 'Edsger W. Dijkstra',
        likes : 12,
       }
       const result = listHelper.favouriteBlog(data.blogs)
       assert.deepStrictEqual(result, most_likes)
    })
})