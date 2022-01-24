// API routes to MongoDB
const blogRouter = require('express').Router()
const blogObj    = require('../models/blogSchema')
const logger     = require('../utils/logger')

blogRouter.get('/', (request, response) => {
    blogObj.find({})
           .then(result => {
               response.json(result)
           })
})

blogRouter.post('/', (request, response) => {
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

    newBlog.save()
           .then(result => {
                response.json(result)
           })
           .catch(error => logger.error(error))
})


module.exports = blogRouter