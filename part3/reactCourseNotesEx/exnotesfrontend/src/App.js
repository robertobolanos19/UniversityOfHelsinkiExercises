import './App.css';
import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification';

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  //*notifications
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType]= useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
        setNotificationType('success')
        setNotification('A new note has been added!')
        setTimeout(()=>{
          setNotification(null)
        },5000)
      })
      .catch(error=>{
        setNotificationType('error')
        setNotification((error.response.data.error))
        setTimeout(()=>{
          setNotification(null)
        },10000)
      })
  }

  const handleDeleteNote=(note)=>{
    window.confirm('Delete this note?')
    &&noteService.deleteNote(note.id)
    .then(response=>{
      setNotes(notes.filter(n => n.id !== note.id))
      setNotification('A note has been deleted!')
      setTimeout(()=>{
        setNotification(null)
      },5000)
    })
    .catch(error => {
      alert(
        `This note isn't in the database!`
      )
      setNotes(notes.filter(n => n.id !== note.id))
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `This note isn't in the database!`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <>
      <h1>Notes</h1>
      <Notification message={notification} type={notificationType}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div> 
      <ul>
        <ul>
          {notesToShow.map(note => 
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
              del={handleDeleteNote}
            />
          )}
        </ul>
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </>
  )
}


export default App
