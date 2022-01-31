const supertest  = require('supertest')
const mongoose   = require('mongoose')
const jwt        = require('jsonwebtoken')
const blogHelper = require('./blogHelper')
const app        = require('../app')
const api        = supertest(app)

const Blog      = require('../models/blogSchema')
const User      = require('../models/userSchema')

const addInitialUsers = async () => {
    await User.deleteMany({})
    for(i = 0; i < blogHelper.initialUsers.length; i++){
        const user = {
            "username": blogHelper.initialUsers[i].username,
            "password": blogHelper.initialUsers[i].password
        }
        await api.post('/api/users').send(user)
    }
}


beforeEach( async () => {
    // Wait on deleting Database entries
    await Blog.deleteMany({})
    await Blog.insertMany(blogHelper.initialBlogs)

    await addInitialUsers()

    // // Initialize each object into an Blog object
    // const newBlogs = blogHelper.initialBlogs.map(data => new Blog(data))

    // // Create an array containg Blog save function
    // const promiseArray = newBlogs.map(blogObj => blogObj.save())

    // // Await and trigger each Blog save function (Puts Blog object into Database)
    // await Promise.all(promiseArray)
})

describe('BLOG TESTING SUITE', () => {
    test('Create users', async () => {
        const newUser = {
            "username": "user3",
            "password": "user3-password"
        }
        await api.post('/api/users').send(newUser)
        
        const addedUsers = await blogHelper.getUsers()
        const usernames  = addedUsers.map(user => user.username)
        
        expect(usernames).toHaveLength(blogHelper.initialUsers.length + 1)
        expect(usernames).toContain(newUser.username)
    })

    test('List Users', async () => {
        const users = await api.get('/api/users').expect(200)

        expect(users.body).toHaveLength(blogHelper.initialUsers.length)
    })

    test('Login Tokens', async () => {
         const loginUser = {
            "username": blogHelper.initialUsers[0].username,
            "password": blogHelper.initialUsers[0].password
        }

        const newtoken    = await api.post('/api/login').send(loginUser)
        expect(newtoken.body.token).not.toBe(undefined)
        const loginStatus = jwt.verify(newtoken.body.token, process.env.SECRET)

        const users = await blogHelper.getUsers()

        expect(loginStatus.id).toBe(users[0].id)

    })

    test('Bad Login username', async () =>{
        const loginUser = {
            "username": "UsernameDontExist",
            "password": "nope"
        }
        const newtoken = await api.post('/api/login').send(loginUser)
        expect(newtoken.body).toEqual({ "error": "invalid user or password" })
    })

    test('Bad Login password', async () =>{
        const loginUser = {
            "username": blogHelper.initialUsers[0].username,
            "password": "nope"
        }
        const newtoken = await api.post('/api/login').send(loginUser)
        expect(newtoken.body).toEqual({ "error": "invalid user or password" })
    })

    test('List Blogs', async () => {
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

        const newtoken  = await api.post('/api/login').send(blogHelper.initialUsers[0])
        expect(newtoken.body.token).not.toBe(undefined)

        const newBlog = {
            title: 'tbf-dbf-rs-pb-and-is-ig',
            author:'gunz',
            likes:'808',
            url:'ijji.com'
        }
        
        await api.post('/api/blogs')
                 .set('authorization', `bearer ${newtoken.body.token}`)
                 .send(newBlog)
                 .expect(200)

        const curBlog = await blogHelper.getBlogs()
        const titles  = curBlog.map(blog => blog.title)

        expect(titles).toContain(newBlog.title)
        
    })

    ///////////////////////////////
    test('Missing likes', async () => {
        const newtoken  = await api.post('/api/login').send(blogHelper.initialUsers[0])
        expect(newtoken.body.token).not.toBe(undefined)

        const newBlog = {
            title: 'wowyouresocooldoyouwanttobemyfriendorwhatbecauseIthinkwellmakeagreatteamlol',
            author:'noone',
            url:  'ineedfriends.com'
        }

        await api.post('/api/blogs')
                 .set('authorization', `bearer ${newtoken.body.token}`)
                 .send(newBlog)
                 .expect(200)
                 
        const curBlogs = await blogHelper.getBlogs()
        const temp     = curBlogs.find(x => x.title === newBlog.title)

        expect(temp.likes).toBe(0)
    })

    //////////////////////////////
    test('Missing title and url', async() => {
        const newtoken  = await api.post('/api/login').send(blogHelper.initialUsers[0])
        expect(newtoken.body.token).not.toBe(undefined)

        const newBlog = {
            author: 'it aint going to work',
            likes: 342789
        }

        await api.post('/api/blogs')
                 .set('authorization', `bearer ${newtoken.body.token}`)
                 .send(newBlog)
                 .expect(400)
    })

    ///////////////////////////////////
    test('Delete my blog', async () => {
        const newtoken  = await api.post('/api/login').send(blogHelper.initialUsers[0])
        expect(newtoken.body.token).not.toBe(undefined)

        const newBlog = {
            title: 'runescape',
            author:'jagex',
            likes:'345',
            url:'runescape.com'
        }
        
        await api.post('/api/blogs')
                 .set('authorization', `bearer ${newtoken.body.token}`)
                 .send(newBlog)
                 .expect(200)


        const blogStart = await blogHelper.getBlogs()
        const deleteBlog = blogStart.find(i => i.title === newBlog.title)

        await api.delete(`/api/blogs/${deleteBlog.id}`)
                 .set('authorization', `bearer ${newtoken.body.token}`)
                 .expect(204)

        const blogEnd = await blogHelper.getBlogs()

        expect(blogEnd).toHaveLength(blogHelper.initialBlogs.length)
        
        const titles = blogEnd.map(r => r.title)
        expect(titles).not.toContain(deleteBlog.title)
        
    })

    test('Delete someone blog', async () => {
        const newtoken0  = await api.post('/api/login').send(blogHelper.initialUsers[0])
        expect(newtoken0.body.token).not.toBe(undefined)

        const newBlog = {
            title: 'runescape',
            author:'jagex',
            likes:'345',
            url:'runescape.com'
        }
        
        await api.post('/api/blogs')
                 .set('authorization', `bearer ${newtoken0.body.token}`)
                 .send(newBlog)
                 .expect(200)


        const blogStart = await blogHelper.getBlogs()
        const deleteBlog = blogStart.find(i => i.title === newBlog.title)

        const newtoken1  = await api.post('/api/login').send(blogHelper.initialUsers[1])
        expect(newtoken1.body.token).not.toBe(undefined)

        await api.delete(`/api/blogs/${deleteBlog.id}`)
                 .set('authorization', `bearer ${newtoken1.body.token}`)
                 .expect(401)
    })



    test('Update my blog', async () => {
        const newtoken  = await api.post('/api/login').send(blogHelper.initialUsers[0])
        expect(newtoken.body.token).not.toBe(undefined)

        const newBlog = {
            title: 'maplestory',
            author:'Nexon',
            likes:'784',
            url:'nexon.com'
        }
        
        await api.post('/api/blogs')
                 .set('authorization', `bearer ${newtoken.body.token}`)
                 .send(newBlog)
                 .expect(200)


        const blogStart = await blogHelper.getBlogs()
        let updateBlog = blogStart.find(i => i.title === newBlog.title)

        updateBlog.likes = 88888888888

        await api.put(`/api/blogs/${updateBlog.id}`)
                 .set('authorization', `bearer ${newtoken.body.token}`)
                 .send(updateBlog)
                 .expect(204)

        const blogEnd = await blogHelper.getBlogs()
        const updateLike = blogEnd.find(r => r.likes === updateBlog.likes)

        expect(updateLike.likes).toBe(updateBlog.likes)
    })

    test('Update someone blog', async () => {
        const newtoken0  = await api.post('/api/login').send(blogHelper.initialUsers[0])
        expect(newtoken0.body.token).not.toBe(undefined)

        const newBlog = {
            title: 'maplestory',
            author:'Nexon',
            likes:'784',
            url:'nexon.com'
        }
        
        await api.post('/api/blogs')
                 .set('authorization', `bearer ${newtoken0.body.token}`)
                 .send(newBlog)
                 .expect(200)


        const blogStart = await blogHelper.getBlogs()
        let updateBlog = blogStart.find(i => i.title === newBlog.title)

        updateBlog.likes = 88888888888

        const newtoken1  = await api.post('/api/login').send(blogHelper.initialUsers[1])
        expect(newtoken1.body.token).not.toBe(undefined)


        await api.put(`/api/blogs/${updateBlog.id}`)
                 .set('authorization', `bearer ${newtoken1.body.token}`)
                 .send(updateBlog)
                 .expect(401)
    })
})


    
    

afterAll(() => {
    mongoose.connection.close()
})