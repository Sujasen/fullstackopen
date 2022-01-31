const Blog = require('../models/blogSchema')
const User = require('../models/userSchema')

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

const initialUsers = [
    {
        "username":"user1",
        "password":"thisismysuperduperlongpasswordthatissuperduperlongandsuperdupercoolhahahahhahahahahahahahhahahahahahahahahhahahahahahahahahahhahahahahahahahahahahahahahaaahahhahahahhhahahahahahahahahahahahahhahahahahahahhahahahaahahhahahahahahahahahahhahahahaaaaaaaahhahhahhahhahhahahahahahahahhaha",
    },
    {
        "username":"user2",
        "password":"user2"
    }
]

const getBlogs = async () => {
    const data = await Blog.find({})
    return data.map(blog => blog.toJSON())
}

const getUsers = async () => {
    const data = await User.find({})
    return data.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, getBlogs,
    initialUsers, getUsers
}