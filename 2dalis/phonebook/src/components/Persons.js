import React from "react";
const Persons=({persontoshow, deletePerson})=>{
return(
    <div>
        {persontoshow.map(a=><div key={a.id}> {a.name} {a.number}
        <button type="button" value={a.id} onClick={deletePerson}>delete</button></div>)}
    </div>
)
}
export default Persons;
