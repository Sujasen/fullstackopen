import React, { useState }from 'react'

const BlogForm = ({createAction}) => {
    const [title, setTitle]       = useState('')
    const [author, setAuthor]     = useState('')
    const [url,    setUrl]        = useState('') 

    const handleCreate = (event) => {

        createAction( {title, author, url})
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    

    return(
        <div>
            <h1>Create New</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Title:  </td>
                        <td><input value={title} onChange={({target}) => setTitle(target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Author: </td>
                        <td><input value={author} onChange={({target}) => setAuthor(target.value)}/></td>
                    </tr>
                    <tr>
                        <td>URL:    </td>
                        <td><input value={url} onChange={({target}) => setUrl(target.value)}/></td>
                    </tr>
                    <tr>
                        <td><button onClick={handleCreate}>Create Blog</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BlogForm