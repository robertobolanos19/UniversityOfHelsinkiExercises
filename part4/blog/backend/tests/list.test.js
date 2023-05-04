const listHelper = require('../utils/list_helper')
const logger = require('../utils/logger')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

//*we will make it so that from now we will be using local data and if there is any db data we wipe out and
//*replace it with our local data
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(listHelper.initialBlogs)
})

//!not an important test
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

//*WORKING FINE
describe('testing blog values', () => {
  //*were getting the local db from listHelper and setting its value to listOfBlogs
  const listOfBlogs = listHelper.initialBlogs

  test('when list has 6 initial blogs what are the total likes', () => {
    //*were sending listOfBlogs to listHelps function:totalLikes, and giving using listOfBlogs as a parameter
    const result = listHelper.totalLikes(listOfBlogs)
    expect(result).toBe(10)
  })

  test('from a initial blog list of 6 whats the favorite blog with most likes', () => {
    //*were sending listOfBlogs to listHelps function:favoriteBlog, and giving using listOfBlogs as a parameter
    const result = listHelper.favoriteBlog(listOfBlogs)
    expect(result).toBe(5)
  })

})

//*Working
describe('testing api requests', () => {

  test('testing api get request', async () => {
    //*getting the data in the api
    const blogsList = await api.get('/api/blogs')
    expect(blogsList.body).toHaveLength(5)
  })

  test('testing post request', async () => {
    //*getting the data in the api
    const baseBlogs = await api.get('/api/blogs')
    //*declaring a var of initialBlogsLength based on blogsAtStars body length
    const initialBlogsLength = baseBlogs.body.length
    //*creating a dummy blog to do the test
    const blog = {
      title:'testTitle3',
      author:'testAuthor3',
      url:'testUrl3',
      likes:3
    }

    /*below we are waiting for the api to send a post request and expecting a 201 (it was successful)
      afterwards were expecting the content of the post to be json*/
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    //*afterwards we wait for the new api to update with the new data we just sent
    const blogsPostAdd = await api.get('/api/blogs')
    //*since we just awaited the apis new data the length of blogsPostAdd should be initialBlogsLength + 1
    expect(blogsPostAdd.body).toHaveLength(initialBlogsLength + 1)
  })

  test('testing deletion', async() => {
    //*getting the data in the api
    const blogsAtStart = await api.get('/api/blogs')
    //*declaring a var of initialBlogsLength based on blogsAtStars body length
    const initialBlogsLength = blogsAtStart.body.length
    //*we are now declaring a var based on the object in blogsAtStart's body
    const blogToDelete = blogsAtStart.body[0]

    //*we are now waiting for the api to look for blogToDelete's id in the db and then if found delete it
    //*if it was successful we should expect 204 which means no content was found
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    //*afterwards we wait for the new api to update with the new data we just sent
    const blogsAfterDeletion = await api.get('/api/blogs')
    //*were expecting blogsAfterDeletion.body's length to have a value of initialBlegsLength - 1 since we deleted a object
    expect(blogsAfterDeletion.body).toHaveLength(initialBlogsLength - 1)
  })

  test('testing update', async() => {

    const blogsList = await api.get('/api/blogs')
    const blogToUpdate = blogsList.body[0]

    const blog =
    {
      title:'Testing update',
      author:'Testing update',
      url:'Testing update',
      likes:1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(200)

    const blogsAfterUpdate = await api.get('/api/blogs')
    expect(logger.info(blogsAfterUpdate.body[0].title))
    expect(blogsAfterUpdate.body[0].title)
      .toContain('Testing update')
  })

})

describe('testing api reactions to values', () => {

  test('verifying unique identifier is named id', async () => {
    //*getting the data in the api
    const blogsList = await api.get('/api/blogs')
    //*from our response we are mapping out each blog and assigning them to blogs
    const blogs = blogsList.body.map(blog => blog)
    //*we are looping through var i until it meets the value of len, during this process we are expecting the value of
    //*blogs[i].id to be defined
    const result = listHelper.loopThroughBlogsId(blogs)
    logger.info(result)
    //*after we get the value of result we should expect the var to have id's defined for each blog
    expect(result).toBeDefined()
    expect(result).toHaveLength(5)
  })

  test('testing if missing likes', async() => {
    //*declaring a dummy data
    const blog = {
      title:'testingLikes1',
      author:'testingLikes1',
      url:'testingLikes1'
    }
    //*if the blog.likes is undefined we are adding a value of likes to blog and giving the value of likes 1
    if(blog.likes === undefined)
    {
      blog.likes = 0
      expect(logger.info(blog))
    }
    //*we are then awaiting the api to post the new blog and return 201 as successful with the values also being json
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    //*we wait for the api to get the updated blogs
    const updatedBlogsList = await api.get('/api/blogs')
    //*setting var blogs as an array based on updatedBlogsList body value
    const blogs = updatedBlogsList.body.map(blog => blog)
    //*we send blogs into listHelper and we save the data returned to result
    const result = listHelper.loopThroughBlogsLikes(blogs)
    expect(result).toBeDefined()
    expect(result).toHaveLength(6)
  })

  test('testing post without required values', async() => {
    const blog =
    {
      author:'Merry'
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)

    // const updatedBlogsList = await listHelper.blogInDb()

    // expect(updatedBlogsList).toHaveLength(listHelper.initialBlogs.length)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})