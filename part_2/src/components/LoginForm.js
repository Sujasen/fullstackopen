import React from 'react'

const LoginForm = ({submitAction, userID, userPass, setUserID, setUserPass}) => {

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submitAction}>
            <div>
                username 
                <input type="text" value={userID} name="Username" onChange={({ target }) => setUserID(target.value)}/>
            </div>
            <div>
                password
                <input type="password" value={userPass} name="Password" onChange={({ target }) => setUserPass(target.value)}/>
            </div>
            <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm