import React from 'react'

const BlogForm = ({titleVal, authorVal, urlVal, setTitleVal, setAuthorVal, setUrlVal, createAction}) => {

    return(
        <div>
            <h1>Create New</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Title:  </td>
                        <td><input value={titleVal} onChange={({target}) => setTitleVal(target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Author: </td>
                        <td><input value={authorVal} onChange={({target}) => setAuthorVal(target.value)}/></td>
                    </tr>
                    <tr>
                        <td>URL:    </td>
                        <td><input value={urlVal} onChange={({target}) => setUrlVal(target.value)}/></td>
                    </tr>
                    <tr>
                        <td><button onClick={createAction}>Create Blog</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BlogForm