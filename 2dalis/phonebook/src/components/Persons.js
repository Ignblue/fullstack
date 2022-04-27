import React from "react"
import personService from '../servises/persons'

const Persons = ({ persons, setPersons, setConfirmMessage, searchName }) =>
{
    //
    //handleDelete
    //

    const handleDelete = async (person) =>
    {
        if (window.confirm(`Delete ${person.name}?`))
        {
            try
            {
                await personService.remove(id)
                const result = await personService.getAll();
                setPersons(result)
                setConfirmMessage(`deleted ${person.name}.`)
                setTimeout(() =>
                {
                    setConfirmMessage(null)
                }, 5000)
            }
            catch (err)
            {
                console.log("Persons.handleDelete", err)
            }
        }
    }

    //filter by searchName
    const personToShow = persons.filter(ele => ele.name.includes(searchName))

    return (
        <div>
            {
                personToShow.map((ele, i) => 
                {
                    return (
                        <div key={i}>
                            <p>{ele.name} {ele.number}</p>
                            <button onClick={function () { handleDelete(ele) }}>delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Persons

