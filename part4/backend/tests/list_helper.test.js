const { test, describe } = require('node:test')
const assert = require('node:assert')

// custom imports
const listHelper = require('../utils/list_helper')
const testData = require('./blog_test_data')
const { resourceLimits } = require('node:worker_threads')

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
        const result = listHelper.totalLikes(testData.single_blog)
        assert.strictEqual(result, 5)
    })
    
    test('of a bigger list is calculated right', () => {
        // total likes = 36
        const result = listHelper.totalLikes(testData.blogs)
        assert.strictEqual(result, 36)
    })
})

describe('favourite blog', () => {
    test('of empty list is null', () => {
        const blogs = []
        const result = listHelper.favouriteBlog(blogs)
        assert.strictEqual(result, null)
    })

    test('when list has only one blog equals that blog', () => {
        const result = listHelper.favouriteBlog(testData.single_blog)
        assert.deepStrictEqual(result, {title : "Go To Statement Considered Harmful", 
            author: "Edsger W. Dijkstra", 
            url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf", 
            likes:5
        })
    })

    test('of a bigger list is found correctly', () => {
        const result = listHelper.favouriteBlog(testData.blogs)
        assert.deepStrictEqual(result, {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
        })
    })
})