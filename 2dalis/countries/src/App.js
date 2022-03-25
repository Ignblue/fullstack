import React, {useState, useEffect} from "react";
import axios from "axios";
import Nations from './components/Nations.js'

const App=()=> {
  const [countries,setCountries] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(()=>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  },[])


const handleSearchChange=(event)=>{
  setSearchName(event.target.value);
};

const showCountry=(event)=>{
  event.preventDefault();
  setSearchName(event.target.value)
};
const nationsToShow = countries.filter(nation=>{
  const name=nation.name.official;
  const name_low_case=name.toLowerCase();
  const search_name_low_case=searchName.toLowerCase();
  return name_low_case.includes(search_name_low_case)
})
  return (
    <div>
      <div>
        find countries <input value={searchName} onChange={handleSearchChange}/>
      </div>
      <Nations searchName={searchName} nationstoshow={nationsToShow} showCountry={showCountry}/>
    </div>
  );
}

export default App;
