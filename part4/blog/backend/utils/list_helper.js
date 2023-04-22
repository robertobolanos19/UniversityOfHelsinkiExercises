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

    logger.info(result)
    return result
}

const favoriteBlog = (blog) => 
{
    
}

module.exports = 
{
    dummy,
    totalLikes
}
