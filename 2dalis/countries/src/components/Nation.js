import React from "react";

const Nation = ({ nation }) =>
{
  //siuo atveju  mums reikia tik objekto {nation.languages} savybiu reiksmiu, tai labiau tiktu Object.values metodas
  //galima ir Object.entries naudoti, atrodytu taip
  // Object.entries(nation.languages).map(
  //   (language, i) => <li key={i}>{language[1]}</li>
  // )

  //atkreipkit demesi metodu grazinamas reiksmes
  console.log("Nation:");
  console.log(nation.languages);
  console.log("entries", Object.entries(nation.languages));
  console.log("keys", Object.keys(nation.languages));
  console.log("values", Object.values(nation.languages));

  return (
    <div>
      <h1>{nation.name.official}</h1>
      <div>capital {nation.capital}</div>
      <div>region {nation.region}</div>
      <h3>languages</h3>

      <ul>
        {Object.values(nation.languages).map(
          (language, i) => <li key={i}>{language}</li>
        )}
      </ul>
    </div>
  )
}
export default Nation;