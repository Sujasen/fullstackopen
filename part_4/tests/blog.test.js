const supertest  = require('supertest')
const mongoose   = require('mongoose')
const blogHelper = require('./blogHelper')
const app        = require('../app')
const api        = supertest(app)

const Blog      = require('../models/blogSchema')

beforeEach( async () => {
    // Wait on deleting Database entries
    await Blog.deleteMany({})

    // Initialize each object into an Blog object
    const newBlogs = blogHelper.initialBlogs.map(data => new Blog(data))

    // Create an array containg Blog save function
    const promiseArray = newBlogs.map(blogObj => blogObj.save())

    // Await and trigger each Blog save function (Puts Blog object into Database)
    await Promise.all(promiseArray)
})

describe('BLOG TESTING SUITE', () => {
    test('http get', async () => {
        const blogs = await api.get('/api/blogs')

        expect(blogs.body).toHaveLength(blogHelper.initialBlogs.length)
    })

    ///////////////////////////////
    test('validiate property id', async () => {
        const blogs = await api.get('/api/blogs')
        
        expect(blogs.body[0].id).toBeDefined()
    })

    ////////////////////////////////
    test('http post', async() => {
        const newBlog = {
                title: 'tbf-dbf-rs-pb-and-is-ig',
                author:'gunz',
                likes:'808',
                url:'ijji.com'

            }
        
        await api.post('/api/blogs')
                 .send(newBlog)
                 .expect(200)

        const curBlog = await blogHelper.getBlogs()
        const titles  = curBlog.map(blog => blog.title)

        expect(titles).toContain(newBlog.title)
        
    })

    ///////////////////////////////
    test('Missing likes', async () => {
        const newBlog = {
            title: 'wowyouresocooldoyouwanttobemyfriendorwhatbecauseIthinkwellmakeagreatteamlol',
            author:'noone',
            url:  'ineedfriends.com'
        }

        await api.post('/api/blogs')
                 .send(newBlog)
                 .expect(200)
                 
        const curBlogs = await blogHelper.getBlogs()
        const temp     = curBlogs.find(x => x.title === newBlog.title)

        expect(temp.likes).toBe(0)
    })

    //////////////////////////////
    test('Missing title and url', async() => {
        const newBlog = {
            author: 'it aint going to work',
            likes: 342789
        }

        await api.post('/api/blogs')
                 .send(newBlog)
                 .expect(400)
    })
    

    afterAll(() => {
        mongoose.connection.close()
    })





})