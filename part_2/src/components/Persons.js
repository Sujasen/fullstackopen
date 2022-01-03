import React from 'react'



const Persons = ({data, filter}) => {
    const filteredContacts = data.filter( person => person.name.toLowerCase().includes(filter))

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
                    </tr> )}
            </tbody>

        </table>
            
    )

}

export default Persons