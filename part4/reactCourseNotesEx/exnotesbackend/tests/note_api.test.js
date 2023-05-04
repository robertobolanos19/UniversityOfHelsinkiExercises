const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Note = require('../models/note')

beforeEach(async () => {
  await Note.deleteMany({})

  for (let note of helper.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
  }
})

//*all working
describe('when there is initially some notes saved', () => {

  test('testing if notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(r => r.content)

    expect(contents).toContain(
      'Browser can execute only JavaScript'
    )
  })

})

describe('viewing a specific note', () => {

  test('testing specific note search', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToView = notesAtStart[0]

    const resultNote = await api.get(`/api/notes/${noteToView.id}`).expect(200).expect('Content-Type', /application\/json/)
    expect(resultNote.body).toEqual(noteToView)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404)
  })

  //!NOT WORKING
  // test('fails with statuscode 400 id is invalid', async () => {
  //   const invalidId = '5a3d5da59070081a82a3445'

  //   await api
  //     .get(`/api/notes/${invalidId}`)
  //     .expect(400)
  // })

})

describe('addition of a new note', () => {

  test('testing a post ', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

    const contents = notesAtEnd.map(n => n.content)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })

  //!NOT WORKING
  // test('testing post without required content', async () => {
  //   const newNote = {
  //     important: true
  //   }

  //   await api
  //     .post('/api/notes')
  //     .send(newNote)
  //     .expect(400)
  //   const notesAtEnd = await helper.notesInDb()
  //   expect(notesAtEnd).toHaveLength(helper.initialNotes.length)})

})

//*Working
describe('deletion of a note', () => {

  test('testing deletion of note', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(
      helper.initialNotes.length - 1
    )

    const contents = notesAtEnd.map(r => r.content)
    expect(contents).not.toContain(noteToDelete.content)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})

