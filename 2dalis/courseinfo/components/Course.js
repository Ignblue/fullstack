import React from 'react'

const Total = ({parts}) => {
  return (
    <h3> total of {parts.reduce((s,p)=>s+p.exercises,0)} exercises </h3>
  )
}
const Title = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}
const Part = ({partname, partexercise})=> {
  return (
    <p>{partname} {partexercise}</p>
  )
}
const Parts= ({part})=>{
  return (
<div>
  {part.map(a=><Part key={a.id} partname={a.name} partexercise={a.exercises}/>)}
</div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Title title={course.name}/>
     <Parts part={course.parts}/>
   <Total parts={course.parts}/>         
    </div>
  )
}
export default Course