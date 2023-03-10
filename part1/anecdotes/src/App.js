import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const length = anecdotes.length

  const random=()=>{
    return Math.floor(Math.random() * length);
  }

  //startingVotes is based on the length which is the length of the main array that will be needed to cycle through, Array() uses this value to create a new array and then the fill method sets them all to 0
  const startingVotes = Array(length).fill(0)
  
  //useState(random()) will make it so that the starting number will always be random due to the function
  const [selected, setSelected] = useState(random())
  const [votes,setVotes] = useState(startingVotes)
  const [max,setMax] = useState(0)

  const updateVote = (i)=>{
    const copy = [...votes]
    copy[i] += 1
    setVotes(copy)
    setMax(copy.indexOf(Math.max(...copy)))
  }

  return (
    <>
    <h1>Anecdote of the day</h1>
    {anecdotes[selected]}
    <div>
      <p>Has {votes[selected]} votes</p>
      <button onClick={()=>updateVote(selected)}>vote</button>
      <button onClick={()=>setSelected(random)}>next anecdote</button>
    </div>
    <h1>Anecdote with the most votes</h1>
    {anecdotes[max]}
    <p>Has {votes[max]} votes</p>
    </>
    
  )
}

export default App