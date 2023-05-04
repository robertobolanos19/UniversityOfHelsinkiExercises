const Note = require('../models/note')

//initialNotes array containing the initial local database state
const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  },
  {
    content: 'JavaScript',
    important: false
  }
]

//can be used for creating a database object ID that does not belong to any note object in the database
const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}
//notesInDb function that can be used for checking the notes stored in the database.
const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialNotes, nonExistingId, notesInDb
}