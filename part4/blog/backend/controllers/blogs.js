//!FINE
//const logger = require('../utils/logger')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username:1, name:1 })

  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request,response) => {
  const body = request.body

  const user = await User.findById(request.user)

  console.log(user)

  const blog = new Blog({
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes,
    user:user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

})

blogRouter.delete('/:id',  middleware.userExtractor, async (request,response) => {

  const userid = await User.findById(request.user)
  //console.log(userid._id.toString())


  const blog = await Blog.findById(request.params.id)
  //console.log(blog.user._id.toString())

  if ( blog.user._id.toString() !== userid.id.toString())
  {
    return response.status(401).json({ error: 'only the creator can delete this' })
  }

  userid.blogs = userid.blogs.filter(b => b === request.params.id)

  await userid.save()

  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()

})


blogRouter.put('/:id', async(request,response) => {
  const body = request.body

  const blog = {
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
  response.json(updatedBlog)

})

module.exports = blogRouter