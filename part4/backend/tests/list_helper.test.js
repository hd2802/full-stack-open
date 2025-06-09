const { test, describe } = require('node:test')
const assert = require('node:assert')

// Importing module to test
const listHelper = require('../utils/list_helper')

// Importing test data
const blogs_data = require('../data/test_blogs')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    
    test('of empty list is zero', () => {
        const blogs = []

        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })
})

describe('favourite blog', () => {
        test('of empty list is undefined', () => {
            const blogs = []
            const result = listHelper.favouriteBlog(blogs)
            assert.strictEqual(result, null)
        })

        test('when list has only one blog, returns that blog', () => {
            const blogs = blogs_data.singleton_blog
            const result = listHelper.favouriteBlog(blogs)
            assert.deepStrictEqual(result, blogs[0])
        })

        test('of a bigger list is the one with most likes', () => {
            const blogs = blogs_data.blogs
            const expected = blogs.reduce((fav, blog) => fav.likes > blog.likes ? fav : blog)
            const result = listHelper.favouriteBlog(blogs)
            assert.deepStrictEqual(result, expected)
        })
    })