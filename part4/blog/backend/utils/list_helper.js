const logger = require('./logger')

const Blog = require('../models/blog')

const dummy = () =>
{
  return 1
}

const totalLikes = (blog) =>
{
  const blogs = blog.map(blog => blog.likes)
  let result = blogs.reduce((a,b) => {
    return a+b
  })

  //logger.info(result)
  return result
}

const favoriteBlog = (blog) =>
{
  const blogs = blog.map(blog => blog.likes)
  //logger.info(Math.max(...blogs))
  return Math.max(...blogs)
}

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const loopThroughBlogsId = (blogs) =>
{
  const result = blogs.map(blogId => blogId.id)
  logger.info(result)
  return result
}

const loopThroughBlogsLikes = (blogs) =>
{
  const result = blogs.map(blogId => blogId.id)
  return result
}

const initialBlogs = []

const initialUsers = []

module.exports =
{
  dummy,
  totalLikes,
  favoriteBlog,
  blogInDb,
  initialBlogs,
  initialUsers,
  loopThroughBlogsId,
  loopThroughBlogsLikes
}
