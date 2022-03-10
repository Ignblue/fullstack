import React from "react";
import Nation from "./Nation";


const Nations = ({nationstoshow,}) => {
  if(nationstoshow.length<=10){
    return ( <Nation nation={nationstoshow} /> )
  }
  else {
    return ( <div>Too many matches, specify another filter</div>  )
  }
}
export default Nations;