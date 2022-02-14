import React, { useState } from 'react'

const Blog = ({ blog, likeAction }) => {
  const [viewDetails, setViewDetails] = useState(true)
  const [buttonLabel, setButtonLabel] = useState(' View')
  const [inputBlog,  setInputBlog]    = useState(blog)

  const showView = { display: viewDetails ? 'none' : '' }

  const changeView = () => {
    
    setViewDetails(!viewDetails);
    setButtonLabel( viewDetails ? ' Hide' : ' View')

  }

  const handleLike = () => {

    const newBlog = {
      author: inputBlog.author,
      likes: inputBlog.likes + 1,
      title: inputBlog.title,
      url: inputBlog.url,
      id: blog.id
    }
    setInputBlog(newBlog)
    likeAction( newBlog )
  }
  console.log(blog)
  return (
  <div className='black'> 
    {inputBlog.title} 
    <button onClick={changeView}>{buttonLabel}</button>
    <div style={showView}>
      {inputBlog.url}
      <br/>
      likes: {inputBlog.likes}
      <button onClick={ handleLike }>Like</button>
      <br/>
      {inputBlog.author}
    </div>
  </div>  
  )
}

export default Blog