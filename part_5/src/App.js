import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser]         = useState(null)
  // const [title, setTitle]       = useState('')
  // const [author, setAuthor]     = useState('')
  // const [url,    setUrl]        = useState('') 
  const [msg, setMsg]           = useState(null)
  const [css, setCss]           = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogg => setBlogs( blogg ) )
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
  
  const handleCreate = async ({title, author, url}) => {
    
    try{
     const result = await blogService.postBlog({ title, author, url})
      
      if(result) {
        setCss('green')
        setMsg(`Added Title: ${title} Author: ${author} URL: ${url}`)
        
        blogService.getAll().then(blogs => setBlogs( blogs ) ) 
        setTimeout(() => { setMsg(null) }, 5000)
      }
    } catch (exception){
      setCss('red')
      setMsg(`Exception caught: ${exception.message}`)
      setTimeout(() => { setMsg(null) }, 5000)
    }
  }

  const handleLike = async (inputBlog, id) => {
    await blogService.putBlog(inputBlog, id)
    
  }

  const LoginSection = () => {
    return (
      <div>
        <h1>Login Page</h1>
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
        <button onClick={handleLogout}>Logout</button>
      </p>
      <Notification message={msg} nameClass={css}/>
      <Togglable buttonLabel="Create new blog">
        <BlogForm createAction={handleCreate}/>
      </Togglable>

      { blogs.map(blog => <Blog key={blog.id} blog={blog} likeAction={handleLike}/> ) }

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