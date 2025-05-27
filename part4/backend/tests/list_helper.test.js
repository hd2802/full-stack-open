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