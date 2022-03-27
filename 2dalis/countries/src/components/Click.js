import React from 'react'

const Click = ({nationstoshow,showCountry}) => {
  return (
    <div>
    {nationstoshow.map((ele,i) =>
      <div key={i}>
      {ele.name.official}
      <button type="button" value={ele.name.official} onClick={showCountry}>show</button>
      </div>
    )}
    </div>
  )
}

export default Click