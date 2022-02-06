import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser]         = useState(null)
  const [title, setTitle]       = useState('')
  const [author, setAuthor]     = useState('')
  const [url,    setUrl]        = useState('') 
  const [msg, setMsg]           = useState(null)
  const [css, setCss]           = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ) )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('User')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault();
    console.log(`username: ${username} password: ${password}`)

    try{
      const user = await loginService.loginUser({ username, password})

      window.localStorage.setItem('User', JSON.stringify(user))
      
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

      setCss('green')
      setMsg(`${user.username} logged in successfully`)
      setTimeout(() => { setMsg(null) }, 5000)
    } catch (exception) {
      setCss('red')
      setMsg(`Exception caught: ${exception.message}`)
      setTimeout(() => { setMsg(null) }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('User')
    setUser(null)
  }
  
  const handleCreate = async () => {
    
    try{
     const result = await blogService.postBlog({ title, author, url})
      
      if(result) {
        setCss('green')
        setMsg(`Added Title: ${title} Author: ${author} URL: ${url}`)
        
        setTitle('')
        setAuthor('')
        setUrl('')
        blogService.getAll().then(blogs => setBlogs( blogs ) ) 
        setTimeout(() => { setMsg(null) }, 5000)
      }
    } catch (exception){
      setCss('red')
      setMsg(`Exception caught: ${exception.message}`)
      setTimeout(() => { setMsg(null) }, 5000)
    }
  }

  const LoginSection = () => {
    return (
      <div>
        <Notification message={msg} nameClass={css}/>
        <LoginForm formSubmit={handleLogin} 
                  userID={username} 
                  userPass={password} 
                  setUserID={setUsername}
                  setUserPass={setPassword}/>
     </div>
    )
  }

  const BlogSection = () => {
    return(
      <div>
      <h2>blogs</h2>
      <p>
        Welcome, {user.username}! 
        <button onClick={handleLogout}>  Logout</button>
      </p>
      <Notification message={msg} nameClass={css}/>
      <BlogForm titleVal={title} 
                authorVal={author} 
                urlVal={url} 
                setTitleVal={setTitle}
                setAuthorVal={setAuthor}
                setUrlVal={setUrl}
                createAction={handleCreate}/>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    )
  }

  return (
    <div>
      { user === null ? LoginSection() : BlogSection() }
    </div>
  )
}

export default App