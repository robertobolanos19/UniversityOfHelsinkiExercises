const logger = require('./logger')
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

module.exports = 
{
    dummy,
    totalLikes,
    favoriteBlog
}
