const Blog = require('../models/blogSchema')

const initialBlogs = [
    {
        title: "goldensachets",
        author: "rosh",
        likes: 2,
        url: 'gold4less.com'
    },
    {
        title: "some clickbait link",
        author: "you",
        likes: 3,
        url:'faceboooooooooookie.com'
    },
    {
        title: "fullstackopen",
        author: "dev",
        likes: 4,
        url:'hashtag-selftaught.com'
    },
    {
        title: "ithinkyoureokay",
        author: "jason",
        likes: 1,
        url:'linkined.ocm'
    },
    {
        title: "huhuhahahha",
        author: "you",
        likes: 6,
        url:'wat.com'

    },
    {
        title: "whatyousayaboutme",
        author: "you",
        likes: 0,
        url:'steam.com'
    },
    {
        title: "dedededdududuandsayabosolutelynothing",
        author: "train",
        likes: 9,
        url:'twithc'
    }
]

const getBlogs = async () => {
    const data = await Blog.find({})

    return data.map(blog => blog.toJSON())
}


module.exports = {initialBlogs, getBlogs}