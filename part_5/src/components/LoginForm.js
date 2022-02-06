import React from 'react'

    const LoginForm = ({formSubmit, userID, setUserID, userPass, setUserPass}) => {
    return(
        <form onSubmit={formSubmit}>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Username:
                            </td>
                            <td>
                                <input type="text" value={userID} onChange={({target}) => setUserID(target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Password: 
                            </td>
                            <td>
                                <input type="password" value={userPass} onChange={({target}) => setUserPass(target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit"> Login</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </form>
    )
}

export default LoginForm