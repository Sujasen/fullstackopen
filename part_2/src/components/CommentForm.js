import React, { useState } from 'react'

const CommentForm = ({ createComment}) => {
    const [newComment, setNewComment] = useState('')
    
    const handleChange = (event) => {
        setNewComment(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        createComment({
            content: newComment,
            improtant: Math.random()> 0.5,
        })
        setNewComment('')
    }
    return(
        <div>
            <h2>Create a new Comment</h2>
            <form onSubmit={addNote}>
                <input value={newComment} onChange={handleChange}/>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default CommentForm