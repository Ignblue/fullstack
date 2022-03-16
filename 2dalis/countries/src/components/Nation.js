import React from "react";

const Nation= ({ nation }) =>{
    return (
        <div>
            <h1>{nation.name.official}</h1>
            <div>capital {nation.capital}</div>
            <div>region {nation.region}</div>
            <h3>languages</h3>
            
   <ul>
      {Object.entries(nation.languages).map(
        language => <li key={language.name}>{language.name}</li>
      )}
      </ul>
        </div>
    )
}
export default Nation;