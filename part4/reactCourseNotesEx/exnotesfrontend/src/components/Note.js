const Note = ({ note, toggleImportance,del }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li>
      {note.content} 
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={()=>del(note)}>Delete note</button>
    </li>
  )
}

export default Note