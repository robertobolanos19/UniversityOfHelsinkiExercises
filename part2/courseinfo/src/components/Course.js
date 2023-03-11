const Header = (props)=>{
    return(
      <h1>{props.name}</h1>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <p>{name} {exercises}</p>
    )
}
  
const Content = ({parts})=>{
    return(
        <>
            {parts.map((part) =>  <Part key={part.id} name={part.name} exercises={part.exercises} />)}
            <b>
            total of {parts.reduce((sum,part)=>{
                return sum + part.exercises
            },0)} exercises
            </b>
        </>
    )
  }
  
  const Course = ({course}) => {
  

  
    return(
      <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
      </>
    )
  }
  
// 

  export default Course