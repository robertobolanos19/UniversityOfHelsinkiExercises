const listHelper = require('../utils/list_helper')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

//*we will make it so that from now we will be using local data and if there is any db data we wipe out and
//*replace it with our local data
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(listHelper.initialBlogs)

  await User.deleteMany({})
  await User.insertMany(listHelper.initialUsers)

})

//!not an important test
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('testing user related requests', () => {

  test('testing successful api user GET request', async () => {
    const usersList = await api.get('/api/users')

      .expect(200)

    console.log(usersList.body)
  })

  test('testing successful api new user POST request', async () => {
    const newUser = {
      username:'test1',
      name:'test1',
      password:'test1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('testing successful api login user POST request', async () => {
    const newUser = {
      username:'test1',
      name:'test1',
      password:'test1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginInfo = {
      username: 'test1',
      password: 'test1'
    }
    await api
      .post('/api/login')
      .send(loginInfo)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  //!TESTING BAD REQUESTS

  test('testing bad api new user POST request', async () => {

    const newUser = {
      username:'b',
      name:'b',
      password:'b'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('testing bad api user login POST request', async () => {
    const newUser = {
      username:'test1',
      name:'test1',
      password:'test1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginInfo = {
      username: 'b',
      password: 'b'
    }
    await api
      .post('/api/login')
      .send(loginInfo)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

})

describe('testing blog api requests', () => {

  test('testing successful api blog GET request', async () => {
    const blogList = await api.get('/api/blogs')
      .expect(200)

    console.log(blogList.body)
  })

  test('testing successful api blog POST request', async () => {

    const newUser = {
      username:'test1',
      name:'test1',
      password:'test1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginInfo = {
      username: 'test1',
      password: 'test1'
    }

    const result = await api
      .post('/api/login')
      .send(loginInfo)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogPost = {
      title: 'testing a note post after login 1',
      author: 'login 1',
      url: 'https://www.google.com/',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(blogPost)
      .set('Authorization', `Bearer ${result.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  //!BAD REQUESTS

  test('testing bad api blog POST request', async () => {

    const newUser = {
      username:'test1',
      name:'test1',
      password:'test1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loginInfo = {
      username: 'test1',
      password: 'test1'
    }

    await api
      .post('/api/login')
      .send(loginInfo)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogPost = {
      title: 'testing a note post after login 1',
      author: 'login 1',
      url: 'https://www.google.com/',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(blogPost)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})

// describe('testing api reactions to values', () => {

//   test('verifying unique identifier is named id', async () => {
//     //*getting the data in the api
//     const blogsList = await api.get('/api/blogs')
//     //*from our response we are mapping out each blog and assigning them to blogs
//     const blogs = blogsList.body.map(blog => blog)
//     //*we are looping through var i until it meets the value of len, during this process we are expecting the value of
//     //*blogs[i].id to be defined
//     const result = listHelper.loopThroughBlogsId(blogs)
//     logger.info(result)
//     //*after we get the value of result we should expect the var to have id's defined for each blog
//     expect(result).toBeDefined()
//     expect(result).toHaveLength(5)
//   })

//   test('testing if missing likes', async() => {
//     //*declaring a dummy data
//     //!userId is based on a user from our db, if it doesn't work
//     //!then it means that the user doesn't exist
//     const blog = {
//       title:'testTitle3',
//       author:'testAuthor3',
//       url:'testUrl3',
//       userId:'646250cc10edd7b26418f74b'
//     }
//     //*if the blog.likes is undefined we are adding a value of likes to blog and giving the value of likes 1
//     if(blog.likes === undefined)
//     {
//       blog.likes = 0
//       expect(logger.info(blog))
//     }
//     //*we are then awaiting the api to post the new blog and return 201 as successful with the values also being json
//     await api
//       .post('/api/blogs')
//       .send(blog)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)
//     //*we wait for the api to get the updated blogs
//     const updatedBlogsList = await api.get('/api/blogs')
//     //*setting var blogs as an array based on updatedBlogsList body value
//     const blogs = updatedBlogsList.body.map(blog => blog)
//     //*we send blogs into listHelper and we save the data returned to result
//     const result = listHelper.loopThroughBlogsLikes(blogs)
//     expect(result).toBeDefined()
//     expect(result).toHaveLength(6)
//   })

//   test('testing post without required values', async() => {
//     const blog = {
//       title:'testTitle3',
//       userId:'646250cc10edd7b26418f74b'
//     }

//     await api
//       .post('/api/blogs')
//       .send(blog)
//       .expect(400)

//     // const updatedBlogsList = await listHelper.blogInDb()

//     // expect(updatedBlogsList).toHaveLength(listHelper.initialBlogs.length)
//   })

// })