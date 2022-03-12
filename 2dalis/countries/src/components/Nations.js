import React from "react";
import Nation from "./Nation";

const Nations = ({ nationstoshow }) =>
{

  if (nationstoshow.length <= 10)
  {
    // nationstoshow is array, component Nation is for single nation rendering 
    // return (
    //   <Nation nation={nationstoshow} />
    // )

    return (
      <div>
        {nationstoshow.map((ele, i) => <Nation key={i} nation={ele} />)}
      </div>
    );
  }
  else
  {
    return (
      <div>Too many matches, specify another filter</div>
    );
  }
}

export default Nations;