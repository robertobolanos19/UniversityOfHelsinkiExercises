//!MUST FIX NOTIFICATIONS NOT WORKING
//!BOTH GOOD (GREEN) AND BAD (RED) SHOULD WORK WHEN A SUCCESSFUL OR BAD REQUEST IS SENT

import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      noteService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

   const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
  
      noteService
        .update(id, changedNote).then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => {
          setErrorMessage(
            `Note '${note.content}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
    }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  
  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div>
      <h1>Notes app</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()} 
      {user && <div>
        <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      } 
 
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
            />
          )}
        </ul>
      </ul>

      <Footer />
    </div>
  )
}

export default App

// import './App.css';
// import { useState, useEffect } from 'react'

// import Note from './components/Note'
// import Notification from './components/Notification';

// import noteService from './services/notes'
// import loginService from './services/login'



// const App = () => {
//   const [notes, setNotes] = useState([])
//   const [newNote, setNewNote] = useState('')
//   const [showAll, setShowAll] = useState(true)
//   //*notifications
//   const [notification, setNotification] = useState(null)
//   const [notificationType, setNotificationType]= useState(null)
//   //*user info
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     noteService
//       .getAll()
//       .then(initialNotes => {
//         setNotes(initialNotes)
//       })
//   }, [])

//   const handleLogin = async (event) => {
//     event.preventDefault()
    
//     try
//     {
//       const user = await loginService.login({username,password})
      
//       setUser(user)
//       setUsername('')
//       setPassword('')
//     }
//     catch (exception)
//     {
//       setNotification('Wrong credentials')
//       setTimeout(()=>{
//         setNotification(null)
//       },5000)
//     }
//   }

//   const addNote = (event) => {
//     event.preventDefault()
//     const noteObject = {
//       content: newNote,
//       important: Math.random() > 0.5,
//     }

//     noteService
//       .create(noteObject)
//       .then(returnedNote => {
//         setNotes(notes.concat(returnedNote))
//         setNewNote('')
//         setNotification('A new note has been added!')
//         setTimeout(()=>{
//           setNotification(null)
//         },5000)
//       })
//   }

//   const handleDeleteNote=(note)=>{
//     window.confirm('Delete this note?')
//     &&noteService.deleteNote(note.id)
//     .then(response=>{
//       setNotes(notes.filter(n => n.id !== note.id))
//       setNotification('A note has been deleted!')
//       setTimeout(()=>{
//         setNotification(null)
//       },5000)
//     })
//     .catch(error => {
//       alert(
//         `This note isn't in the database!`
//       )
//       setNotes(notes.filter(n => n.id !== note.id))
//     })
//   }

//   const handleNoteChange = (event) => {
//     setNewNote(event.target.value)
//   }

//   const toggleImportanceOf = (id) => {
//     const note = notes.find(n => n.id === id)
//     const changedNote = { ...note, important: !note.important }
  
//     noteService
//       .update(id, changedNote)
//       .then(returnedNote => {
//         setNotes(notes.map(note => note.id !== id ? note : returnedNote))
//       })
//       .catch(error => {
//         alert(
//           `This note isn't in the database!`
//         )
//         setNotes(notes.filter(n => n.id !== id))
//       })
//   }

//   const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important)

//   return (
//     <>
//       <h1>Notes</h1>
//       <Notification message={notification} type={notificationType}/>

//       {!user && loginForm()}
//       {user && <div>
//           <p>{user.name} logged in</p>
//           {noteForm()}
//         </div>}

//       <form onSubmit={handleLogin}>
//         <div>
//           username
//           <input type="text" value={username} name="Username" onChange={ ({target}) => setUsername(target.value)}/>
//         </div>
//         <div>
//           password
//           <input type="text" value={password} name="Password" onChange={ ({target}) => setPassword(target.value)}/>
//         </div>
//         <button type="text">login</button>
//       </form>

//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all' }
//         </button>
//       </div> 
//       <ul>
//         <ul>
//           {notesToShow.map(note => 
//             <Note
//               key={note.id}
//               note={note}
//               toggleImportance={() => toggleImportanceOf(note.id)}
//               del={handleDeleteNote}
//             />
//           )}
//         </ul>
//       </ul>
//       <form onSubmit={addNote}>
//         <input value={newNote} onChange={handleNoteChange} />
//         <button type="submit">save</button>
//       </form>
//     </>
//   )
// }


// export default App
