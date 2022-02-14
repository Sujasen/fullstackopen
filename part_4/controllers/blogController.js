// API routes to MongoDB
const blogRouter = require('express').Router()
const blogObj    = require('../models/blogSchema')
const userObj    = require('../models/userSchema')
const jwt        = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const result = await blogObj.find({})//.populate({author: 1, likes: 1, title: 1, url: 1})
    return response.json(result)
})


blogRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user


    if(!body.likes){
        body.likes = 0
    } else if ( !body.url)  {
        return response.send(400).json({
            error: 'missing url property'
        })
    } else if (!body.title) {
        return response.send(400).json({
            error: 'missing title property'
        })
    }

    
    const newBlog = new blogObj({
        title:  body.title,
        author: body.author,
        url:    body.url,
        likes:  body.likes,
        user:   user._id
    })

    const savedBlog = await newBlog.save()

    user.blog = user.blog.concat(savedBlog._id)
    await user.save()
    return response.json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    const user = request.user

    const blogToDelete = await blogObj.findById(request.params.id)
    if (!blogToDelete){
        return response.status(400).json({message: `${request.params.id} not found. No action taken.` })
    } else if(blogToDelete.user.toString() === user.id.toString()){
        await blogObj.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    } else {
        return response.status(401).json({error: `${request.params.id} blog doesnt belong to user.`})
    }

})

blogRouter.put('/:id', async (request, response) => {

    const body = request.body
    const user = request.user

    const newBlog = {
        author: body.author,
        likes: body.likes,
        title: body.title,
        url: body.url
    }
    const blogToUpdate = await blogObj.findById(request.params.id)
    if(!blogToUpdate){
        return response.status(400).json({ message: `${request.params.id} not found. No action taken`})
    } else if (blogToUpdate.user.toString() === user.id.toString()){
        let temp = await blogObj.findByIdAndUpdate(request.params.id, newBlog, {new: true} )
        return response.status(200).json(temp)
    } else {
        return response.status(401).json({ error: `${request.params.id} blog doesnt belong to user`})
    }
})


module.exports = blogRouter