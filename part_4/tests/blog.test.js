const supertest  = require('supertest')
const mongoose   = require('mongoose')
const blogHelper = require('./blogHelper')
const app        = require('../app')
const api        = supertest(app)

const Blog      = require('../models/blogSchema')
const { update } = require('lodash')

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

    ///////////////////////////////////
    test('Deleting single blog', async () => {
        const blogStart = await blogHelper.getBlogs()
        const deleteBlog = blogStart[0]

        await api.delete(`/api/blogs/${deleteBlog.id}`)
            .expect(204)

        const blogEnd = await blogHelper.getBlogs()

        expect(blogEnd).toHaveLength(blogHelper.initialBlogs.length - 1)
        
        const titles = blogEnd.map(r => r.title)
        expect(titles).not.toContain(deleteBlog.title)
        
    })

    test('Updating single blog', async () => {
        const blogStart = await blogHelper.getBlogs()
        let updateBlog = blogStart[0]

        updateBlog.likes = 88888888888

        await api.put(`/api/blogs/${updateBlog.id}`)
                 .send(updateBlog)
                 .expect(204)

        const blogEnd = await blogHelper.getBlogs()
        console.log(blogEnd)
        const updateLike = blogEnd.find(r => r.likes === updateBlog.likes)

        expect(updateLike.likes).toBe(updateBlog.likes)
    })
})


    
    

afterAll(() => {
    mongoose.connection.close()
})