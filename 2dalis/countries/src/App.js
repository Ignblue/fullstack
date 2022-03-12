import React, { useState, useEffect } from "react";
import axios from "axios";
import Nations from './components/Nations.js'

const App = () =>
{
  const [countries, setCountries] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() =>
  {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response =>
      {
        setCountries(response.data)
      })
  }, []);

  const handleSearchChange = (event) =>
  {
    setSearchName(event.target.value);
  };

  const showCountry = (event) =>
  {
    event.preventDefault();
    setSearchName(event.target.value)
  };

  //use camel notation (nationsToShow) or snake notation (nations_to_show)
  //https://betterprogramming.pub/string-case-styles-camel-pascal-snake-and-kebab-case-981407998841
  const nationstoshow = countries.filter(nation =>
  {
    console.log(nation.name);//not a string!!!
    const name = nation.name.official;//string
    const name_low_case = name.toLowerCase();
    const searchName_low_case = searchName.toLowerCase();
    return name_low_case.includes(searchName_low_case);
  });

  //alternative
  // https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#regular-expressions
  // 
  // const regexp1 = new RegExp("searchName", "i");//i for ignore case sensitivity
  // const nationstoshow = countries.filter(nation => regexp1.test(nation.name.official);

  return (
    <div>
      <div>
        find countries <input value={searchName} onChange={handleSearchChange} />
      </div>
      <Nations searchName={searchName} nationstoshow={nationstoshow} showCountry={showCountry} />
    </div>
  );
}

export default App;
