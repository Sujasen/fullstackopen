import React from 'react'
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';

    const LoginForm = ({formSubmit, userID, setUserID, userPass, setUserPass}) => {
    return(
        <Form onSubmit={formSubmit} >
            <FormGroup className='mx-auto' controlId='formUsername'>
                <Form.Label >Username</Form.Label>
                <Form.Control type='text' placeholder='Enter username' value={userID} onChange={({target}) => setUserID(target.value)} />
                <Form.Text className='text-muted'>
                    We'll never share your credentials with anyone else.
                </Form.Text>
            </FormGroup>

            <FormGroup className='mx-auto' controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' value={userPass} onChange={({target}) => setUserPass(target.value)}/>
            </FormGroup>
            <Button variant='primary' type='submit'>
                Submit
            </Button>
        </Form>


       /* <form onSubmit={formSubmit}>
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

        </form>*/
    )
}

export default LoginForm