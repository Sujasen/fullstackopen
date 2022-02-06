const loginRouter = require('express').Router()
const jwt         = require('jsonwebtoken')
const bcrypt      = require('bcrypt')
const userObj     = require('../models/userSchema')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await userObj.findOne({username: body.username})
    const validPassword = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

    if(!validPassword){
        return response.status(401).json({error: 'invalid user or password'})
    } 

    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

    response.status(200).json({token: token, username: user.username, name: user.name})
})

module.exports = loginRouter