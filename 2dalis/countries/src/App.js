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
const nationstoshow = countries.filter(nation => nation.name.toLowerCase().includes(searchName.toLowerCase()));
  return (
    <div>
      <div>
        find countries <input value={searchName} onChange={handleSearchChange}/>
      </div>
      <Nations searchName={searchName} nationstoshow={nationstoshow} showCountry={showCountry}/>
    </div>
  );
}

export default App;
