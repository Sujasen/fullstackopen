const userRouter = require('express').Router()
const userObj    = require('../models/userSchema')
const bcrypt     = require('bcrypt')

userRouter.get('/', async (request, response) => {
    const result = await userObj.find({})
    response.json(result)
})

userRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new userObj({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const result = await newUser.save(newUser)
    response.json(result)
})


module.exports = userRouter