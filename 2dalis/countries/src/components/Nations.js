import React from "react";
import Nation from "./Nation";
import Click from "./Click";

const Nations = ({nationstoshow, showCountry}) => {
  if (nationstoshow.length ===1) {
return ( <Nation nation={nationstoshow[0]} /> )
  }
  else if (nationstoshow.length <= 10)
  {
    return (
      //<div>
       // {nationstoshow.map((ele, i) => <Nation key={i} nation={ele} showcountry={showCountry} />)}
     // </div>
      <Click nationstoshow={nationstoshow} showCountry={showCountry}/>
    );
  } else{
   return (
      <div>Too many matches, specify another filter</div>
    );
  }
}


export default Nations; 