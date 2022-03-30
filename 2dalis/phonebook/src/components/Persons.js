import React from "react"
import personService from '../servises/persons'

const Persons = ({ persons, setPersons, setConfirmMessage, searchName }) =>
{
    //
    //handleDelete
    //
    const handleDelete = (event) =>
    {
        event.preventDefault()

        const id = parseInt(event.target.value)

        const person = persons.find((ele) => ele.id === id)

        //delete

        if (window.confirm(`Delete ${person.name}?`))
        {
            personService.remove(id)
                .then(() => personService.getAll())
                .then((res) =>
                {
                    setPersons(res)
                    setConfirmMessage(`deleted ${person.name}.`)
                })
        }
    }

    //
    // handleDelete2 (a beter way to handle promises (async/await))
    //

    const handleDelete2 = async (event) =>
    {
        event.preventDefault()

        const id = parseInt(event.target.value)

        const person = persons.find((ele) => ele.id === id)

        //delete

        if (window.confirm(`Delete ${person.name}?`))
        {
            try
            {
                await personService.remove(id)
                const result = await personService.getAll();
                setPersons(result)
                setConfirmMessage(`deleted ${person.name}.`)
            }
            catch (err)
            {
                console.log("Persons.handleDelete", err)
            }
        }
    }

    const personToShow = persons.filter(ele => ele.name.includes(searchName))

    return (
        <div>
            {
                personToShow.map((ele, i) => 
                {
                    return (
                        <div key={i}>
                            <p>{ele.name} {ele.number}</p>
                            <button value={ele.id} onClick={handleDelete2}>delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Persons
