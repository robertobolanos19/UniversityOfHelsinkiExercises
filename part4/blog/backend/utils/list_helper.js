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

const initialBlogs = [
  {
    title:'testTitle',
    author:'testAuthor',
    url:'testUrl1',
    likes:3
  },
  {
    title:'testTitle2',
    author:'testAuthor2',
    url:'testUrl2',
    likes:1
  },
  {
    title:'testTitle3',
    author:'testAuthor3',
    url:'testUrl3',
    likes:5
  },
  {
    title:'testTitle4',
    author:'testAuthor4',
    url:'testUrl4',
    likes:1
  },
  {
    title:'testTitle5',
    author:'testAuthor5',
    url:'testUrl5',
    likes:0
  },
]

const initialUsers = [
  {
    username: 'username1',
    name:'name1',
    password:'pass1'
  },
  {
    username: 'username2',
    name:'name2',
    password:'pass2'
  }
]

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
