const logger  = require('./logger')
const jwt     = require('jsonwebtoken')
const userObj = require('../models/userSchema')

const errorHandler = (error, request, response, next) => {
    if(error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }
    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization === undefined && request.method === 'GET'){
        return next()
    }else if (authorization === undefined){
        return response.status(401).json({error: 'token missing'})
    }else if(authorization.toLowerCase().startsWith('bearer')){
        request.token = authorization.substring(7)
    }
    next()
}

const userExtractor = async (request, response, next) => {
    if(request.method === 'GET'){
        return next()
    } else {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if(!decodedToken.id){
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        request.user = await userObj.findById(decodedToken.id) 
        next()
    }
}

module.exports = {errorHandler, tokenExtractor, userExtractor}