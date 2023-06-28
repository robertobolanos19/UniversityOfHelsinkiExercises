const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async ( request, response ) => {
  const users = await User.find({}).populate('blogs', { title:1, author:1, url:1, likes:1 })
  response.json(users)
})

userRouter.post('/', async (request,response) => {
  const { username, name, password } = request.body

  if(password.length < 3)
  {
    return response.status(400).json({
      error:'password too short'
    })
  }

  if(username.length < 3)
  {
    return response.status(400).json({
      error:'username too short'
    })
  }

  if(!(username&&password&&name))
  {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const saltRound = 10
  const passwordHash = await bcrypt.hash(password,saltRound)

  const user = new User({
    username,name,passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)

})

module.exports = userRouter