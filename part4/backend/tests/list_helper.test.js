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

    test('when list has only one blog equals the likes of that', () => {
        const blogs = blogs_data.singleton_blog

        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(blogs[0].likes, result)
    })

    test('of a bigger list is calculated right', () => {
        const blogs = blogs_data.blogs

        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(36, result)
    })
})