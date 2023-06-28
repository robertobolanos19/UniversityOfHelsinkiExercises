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

    const result = 'testing token'

    const blogPost = {
      title: 'testing a note post after login 1',
      author: 'login 1',
      url: 'https://www.google.com/',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(blogPost)
      .set('Authorization', result)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})
