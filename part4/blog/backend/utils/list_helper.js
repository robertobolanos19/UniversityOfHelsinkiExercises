const logger = require('./logger')

const Blog = require('../models/blog')

const dummy = (blogs) =>
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

const initialBlogs = [
    {
        title:'testTitle',
        author:'testAuthor',
        url:'testUrl4',
        likes:3
    },
    {
        title:'testTitle2',
        author:'testAuthor2',
        url:'testUrl2',
        likes:3
    }
]

module.exports = 
{
    dummy,
    totalLikes,
    favoriteBlog,
    blogInDb,
    initialBlogs
}
