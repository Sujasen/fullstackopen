import React, {useState, useEffect} from 'react'
import phoneService from '../services/phoneService'


const Persons = ({data, filter}) => {
    
    const [people, setPeople] = useState(data)
    const filteredContacts = people.filter( person => person.name.toLowerCase().includes(filter))

    useEffect(() => {
        setPeople(data)
    }, [data])

    const handleDelete = (person) => {
        const result = window.confirm(`Delete ${person.name}?`)
        if(result){
            phoneService
                .remove(person.id)
                .then(() => {
                    phoneService
                        .getAll()
                        .then(response => {
                            setPeople(response)
                        })
                })
        }
    }


    return(
        <table>
            <tbody>
                <tr>
                    <td>
                        <b>NAME </b>
                    </td>
                    <td>
                        <b>PHONE NUMBER</b>
                    </td>
                </tr>
                {filteredContacts.map(person => 
                    <tr key={person.id}> 
                        <td>{person.name}</td> 
                        <td>{person.number}</td>
                        <td>
                             <button onClick={() => handleDelete(person)}>Delete</button>
                        </td>
                    </tr> )}
            </tbody>

        </table>
            
    )

}

export default Persons