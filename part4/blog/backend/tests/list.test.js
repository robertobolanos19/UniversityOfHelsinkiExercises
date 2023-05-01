const listHelper = require('../utils/list_helper')
const logger = require('../utils/logger')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)



test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listOfBlogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      ]
  
    test('when list has 6 blogs, equals the likes of that', () => {
      const result = listHelper.totalLikes(listOfBlogs)
      expect(result).toBe(36)
    })
  })



describe('favorite blog', () => {
  const listOfBlogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 17,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 30,
        __v: 0
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 10,
        __v: 0
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 32,
        __v: 0
      }  
    ]

  test('favorite blog with most likes', () => {
    const result = listHelper.favoriteBlog(listOfBlogs)
    expect(result).toBe(32)
  })
})

test('testing api get request', async ()=>{
  const response = await api.get('/api/blogs')

  logger.info(response.body)

  expect(response.body).toHaveLength(3)
},100000)

test('testing get request', async ()=> {
  const baseBlogs = await api.get('/api/blogs')
  logger.info(baseBlogs.body)
  expect(baseBlogs.body)
})

test('verifying unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  
  const blogs = response.body.map(blog => blog)

  for(let i = 0, len = blogs.length; i < len; i++)
  {
    logger.info(blogs[i].id)
    expect(blogs[i].id).toBeDefined()
  }

  // expect(response.body)
})

test('testing post request', async ()=>{
  const baseBlogs = await api.get('/api/blogs')

  const initialBlogsLength = baseBlogs.body.length

  const blog = {
    title:'testTitle2',
    author:'testAuthor2',
    url:'testUrl2',
    likes:3
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)  
  
  const blogsPostAdd = await api.get('/api/blogs')

  logger.info(baseBlogs.body.length)
  logger.info(blogsPostAdd.body.length)

  expect(blogsPostAdd.body).toHaveLength(initialBlogsLength + 1)

})


