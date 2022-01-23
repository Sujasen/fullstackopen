const listHelper = require('../utils/list_helper')

const jasonBlogs = [
    {
        "title": "goldensachets",
        "author": "rosh",
        "likes": 2,
    },
    {
        "title": "some clickbait link",
        "author": "you",
        "likes": 3,
    },
    {
        "title": "fullstackopen",
        "author": "dev",
        "likes": 4,
    },
    {
        "title": "ithinkyoureokay",
        "author": "jason",
        "likes": 1,
    },
    {
        "title": "huhuhahahha",
        "author": "you",
        "likes": 6,
    },
    {
        "title": "whatyousayaboutme",
        "author": "you",
        "likes": 0,
    },
    {
        "title": "dedededdududuandsayabosolutelynothing",
        "author": "train",
        "likes": 9,
    }
]
/////////////////////////////////////////////////
/// Test cases
////////////////////////////////////////////////

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})




describe('Total likes', () => {

    test('Blog test for 1 blog', () => {
        const result = listHelper.totalLikes(jasonBlogs)
        expect(result).toBe(25)
    })


    test('Blog with the most likes', () => {
        const answer = {
            "title": "dedededdududuandsayabosolutelynothing",
            "author": "train",
            "likes": 9
        }
        const result = listHelper.favoriteBlog(jasonBlogs)
        
        expect(result).toEqual(answer)
    })


    test('get author with most blogs', () => {
        const answer = {
            author: "you",
            blogs: 3
        }

        const result = listHelper.mostBlogs(jasonBlogs)
        expect(result).toEqual(answer)
    })


    test('Author with the most likes', () => {
        const answer = {
            "author": "train",
            "likes": 9,
        }

        const result = listHelper.mostLikes(jasonBlogs)
        expect(result).toEqual(answer)
    })

})