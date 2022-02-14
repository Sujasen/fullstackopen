import React, {useState, useEffect, useRef} from 'react'
import Note from './components/Note'
import Course from './components/Course'
import FindCountries from './components/FindCountries'
import axios from 'axios'
import commentService  from './services/commentService'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService  from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import CommentForm from './components/CommentForm'



function App() {
  const course = [
    {
      id: 1,
      name:  'Half Stack application development',
      parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id:1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id:2
          },
          {
            name: 'State of component',
            exercises: 14,
            id:3
          },
          {
            name: 'Redux',
            exercises: 11,
            id: 4
          }
      ]
    },
    {
      name: 'Node.js',
      id:2,
      parts:[
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  //console.log('App Level: ', course);


  
  ///////////////////////////////////////////////////
  // Adding Comments
  ///////////////////////////////////////////////////
  const [comment, setComment]       = useState([]);
  // const [newComment, setNewComment] = useState('a new comment');
  const [showAll, setShowAll]       = useState(true);
  const [errorMsg, setErrorMsg]     = useState(null);
  const [username, setUsername]     = useState('');
  const [password, setPassword]     = useState('');
  const [user,     setUser]         = useState(null);
  const CommentFormRef = useRef()

  useEffect( () => {
    commentService
        .getAll()
        .then(newComment => {
            setComment(newComment)
        })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedInUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      commentService.setToken(user.token)
    }
  }, [])

  const addComment = (commentObject) => {
    CommentFormRef.current.toggleVisibility()
    commentService
        .create(commentObject)
        .then(returnedComment => {
          setComment(comment.concat(returnedComment))
        })
  }

  const toggleImportanceOf = (id) => {
    const comm        = comment.find(n => n.id === id)
    const changedComm =  {...comm, important: !comm.important}

    commentService
      .update(id, changedComm)
      .then(returnedComment => {
        setComment(comment.map(temp => temp.id !== id ? temp : returnedComment))
      })
      .catch(error => {
        setErrorMsg(
          `Note '${comm.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
        setComment(comment.filter(n => n.id !== id))
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try{
      const user = await loginService.login({
          username, password,
      })

      window.localStorage.setItem('LoggedInUser', JSON.stringify(user))

      commentService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      setErrorMsg('Wrong credentials')
      setTimeout(() => { setErrorMsg(null) }, 5000)
    }

  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm submitAction={handleLogin} 
                   userID={username}
                   userPass={password}
                   setUserID={setUsername}
                   setUserPass={setPassword} />
       </Togglable>
    )
  }

  const commentForm = () => {
    return(
      <Togglable buttonLabel='New Note' ref={CommentFormRef}>      
        <CommentForm createComment={addComment}/>
      </Togglable>

    )
  }

  // commentToShow returns an array
  const commentToShow = showAll ? comment : comment.filter(temp => temp.important === true);

//////////////////////////////////////////////////////////////
///////// Countries
//////////////////////////////////////////////////////////////
const [countryObject,  setCountryObject  ]  = useState([])
const [countryDisplay, setCountryDisplay ]  = useState([])
//const [countryInput,   setCountryInput   ]  = useState('')


useEffect(() =>{
  axios.get('https://restcountries.com/v3.1/all')
       .then(response => {
        setCountryObject(response.data)
       })
},[])

const handleCountryInput = (event) => {
  const tempInput   = event.target.value.toLowerCase()

  if(tempInput === '')
  {
    setCountryDisplay([])
    return
  }
  else {
    const tempDisplay = countryObject.filter(country => 
                                            country.name.common.toLowerCase().includes(tempInput))
    setCountryDisplay(tempDisplay)
  }
}

  return (
 
    <div>

      <FindCountries handleCountryInput={handleCountryInput} countryDisplay={countryDisplay}/>

      <h1>Comments</h1>
      <Notification css='error' message={errorMsg}/>

      { user === null ? loginForm() : 
        <div> 
          <p>{user.name} logged-in</p> 
          {commentForm()} 
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {commentToShow.map((note, index) =>
          <Note key ={index} 
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <br/>
      <Course course={course[0]}/>
      <Course course={course[1]}/>
      <Footer />
    </div>
  );
}

export default App;
