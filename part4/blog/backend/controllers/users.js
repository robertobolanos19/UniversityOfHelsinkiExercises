const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request,response) => {
  const { username, name, password } = request.body

  const saltRound = 10
  const passwordHash = await bcrypt.hash(password,saltRound)

  const user = new User({
    username,name,passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)

})

userRouter.get('/', async (request,response) => {
  const users = await User
    .find({}).populate('blogs', { title:1, author:1, likes:1, url:1 })

  response.json(users)
})


module.exports = userRouter