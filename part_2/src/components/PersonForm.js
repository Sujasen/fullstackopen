import React from 'react'


const PersonForm = ({name, handleName, number, handleNumber, handlePerson}) => {

    return (
        <form>
        <table>
          <tbody>  
            <tr>
                <td >Name:</td>
                <td><input value={name} onChange={handleName}/></td>
            </tr>
            <tr>
                <td >Number:</td>
                <td><input value={number} onChange={handleNumber}/> </td>
            </tr>
            <tr>
                <td> <button type='submit' onClick={handlePerson}>Add Contact</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    )

}

export default PersonForm