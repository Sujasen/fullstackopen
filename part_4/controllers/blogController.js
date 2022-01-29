// API routes to MongoDB
const blogRouter = require('express').Router()
const blogObj    = require('../models/blogSchema')
const logger     = require('../utils/logger')

blogRouter.get('/', async (request, response) => {
    const result = await blogObj.find({})
    return response.json(result)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body

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
        likes:  body.likes
    })

    const result = await newBlog.save()

     return response.json(result)
})

blogRouter.delete('/:id', async (request, response) => {
    const result = await blogObj.findByIdAndDelete(request.params.id)

    if(result){
        response.status(204).send(`${request.params.id} deleted`)
    } else {
        response.send(`${request.params.id} not found. No action taken`)
    }
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    const newBlog = {
        author: body.author,
        likes: body.likes,
        title: body.title,
        url: body.url
    }
    const result = await blogObj.findOneAndUpdate(request.params.id, newBlog, {new: true} )

    if(result){
        response.status(204).json(result)
    } else {
        response.send(`${request.params.id} not found. No action taken`)
    }
})


module.exports = blogRouter