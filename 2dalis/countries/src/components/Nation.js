import React from "react";
import Weather from "./Weather";

const Nation= ({ nation}) =>{
    return (
        <div>
            <h3>{nation.name.official} </h3>
             { /*<button type="button" value={nation.name.official} onClick={showcountry} >show</button></h3>*/ }
            <div>capital {nation.capital}</div>
            <div>region {nation.region}</div>
            <h3>languages</h3>
            
   <ul>
      {Object.values(nation.languages).map(
        (language, i) => <li key={i}>{language}</li>
      )}
      </ul>
      <div><img alt='nematau veliavos' src={nation.flags.png} height="100" width="150" /></div>
     <h3>Weather in {nation.capital}</h3>
      <Weather city={nation.capital} />
        </div>
    )
}
export default Nation;