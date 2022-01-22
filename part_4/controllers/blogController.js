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

    logger.info(body)

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