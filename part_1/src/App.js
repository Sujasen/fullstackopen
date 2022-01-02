import React, {useState}from 'react'

const Header = ({headerTitle}) => {
  return (
    <h1>{headerTitle}</h1>
  )
}

const Content = ({content}) => {

  return (
    <div>
      <Part parts={content[0].name} exercise={content[0].exercise} />
      <Part parts={content[1].name} exercise={content[1].exercise} />
      <Part parts={content[2].name} exercise={content[2].exercise} />
    </div>
  )
}

const Part = ({parts, exercise}) => {
  return (
    <p>{parts} {exercise}</p>
  )
}

const Total = ({total}) => {
  return (
    <p>Number of exercises { total[0].exercise + total[1].exercise  + total[2].exercise }</p>
  )
}

  
const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const History = (props) => {
  if(props.allClicks.length === 0)
  {
    return(
      <div>The app is used by pressing the buttons</div>
    )
  }

  return (
    <div>button press history: {props.allClicks.join(' ')}</div>
  )
}

const Title = props => <div> <h1>{props.title} </h1></div>

const Display = ({text}) => {
  return (
  <div> 
    {text} 
  </div>)
}


const Table = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Good</td>
          <td>{props.goodVal}</td>
        </tr>

        <tr>
          <td>Bad</td>
          <td>{props.badVal}</td>
        </tr>

        <tr>
          <td>Neutral</td>
          <td>{props.neutralVal}</td>
        </tr>

        <tr>
          <td>Sum</td>
          <td>{props.sumVal}</td>
        </tr>

        <tr>
          <td>Average</td>
          <td>{props.averageVal}</td>
        </tr>

        <tr>
          <td>Positive</td>
          <td>{props.postiveVal} %</td>
        </tr>
      </tbody>
    </table>
  )

}

////////////////////////////////////////////////////////////////////////////

const Statistics = ({goodVal, badVal, neutralVal}) => {

  const getSum = () => {
    return goodVal + badVal + neutralVal;
  }

  const getAverage = () => {
    return (goodVal + badVal + neutralVal)/3
  }

  const getPositive = () => {
    if(isNaN(goodVal/(goodVal+badVal)))
    {
      return 0;
    }

    return goodVal/(goodVal + badVal) * 100
  }

  if(goodVal === 0 && badVal === 0 && neutralVal === 0)
  {
    return <div>No feedback given</div>
  } 
  else 
  { 
    return (
      <div>
        <Table goodVal    ={goodVal}
               badVal     ={badVal}
               neutralVal ={neutralVal}
               sumVal     = {getSum()}
               averageVal = {getAverage()}
               postiveVal = {getPositive()}/>
    </div>
    )
  }
} 


const App = () => {
  // const [clicks, setClicks] = useState({
  //     left:0, right:0
  //   }
  // )
  // const handleLeftClick = () => setClicks({...clicks, left:   clicks.left + 1});
  // const handleRightClick = () => setClicks({...clicks, right: clicks.right + 1});

  const [left,      setLeft]  = useState(0);
  const [right,     setRight] = useState(0);
  const [allClicks, setAll]   = useState([]);

  const handleLeft = () => {
    setAll(allClicks.concat('L'));
    setLeft(left + 1);
  }

  const handleRight = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1);
  }
  //////////////////////////////////////////////////////////////////////////////////////////
  const title = 'Give Feedback';
  const[feedback, setfeedBack] = useState ({
      good:0, bad:0, neutral:0,
    }
  )

  const handleGood = () => {
    setfeedBack({...feedback, 
                 good: feedback.good + 1, 
                 sum:  feedback.sum  + 1}
    )
  }

  const handleBad = () => {
    setfeedBack({...feedback, 
      bad: feedback.bad + 1, 
      sum:  feedback.sum  + 1}
    )
  }

  const handleNeutral = () => {
    setfeedBack({...feedback, 
      neutral:  feedback.neutral  + 1, 
      sum:      feedback.sum  + 1}
    )
  }
 ////////////////////////////////////////////////////////////////////////

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ] 
  
  const [anecdoteText, setAnecdoteText] = useState(anecdotes[0]);
  
  const [votes, setVotes] = useState({
      index:       0, 
      num:         Array(anecdotes.length).fill(0),
      mostVoteIdx: 0,
      mostVoteVal: 0
    }
  );
  
  const handleAnecdote = () => {
    let temp = Math.floor(Math.random() * anecdotes.length)
    setVotes({...votes, index: temp})
    return (setAnecdoteText(anecdotes[temp]))
  }

  const handleVote = () => {
    const temp = votes.num;
    temp[votes.index]++;

    const maxVoteVal   = Math.max.apply(Math, temp);
    const maxVoteIndex = temp.indexOf(maxVoteVal);

    setVotes({...votes, num: temp, mostVoteIdx: maxVoteIndex, mostVoteVal: maxVoteVal})
  }



 ///////////////////////////////////////////////////////////////////////
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name:'Fundamentals of React',
        exercise: 10
      },
      {
        name:'Using props to pass data',
        exercise: 7
      },
      {
        name:'State of a component',
        exercise: 14
      }
    ]
  }


  return (  
      <div>
        <Header  headerTitle ={course.name} />
        <Content content     ={course.parts}/>
        <Total   total       ={course.parts}/>
        
        {left}
        <Button  onClick     ={handleLeft } text='Left'/>
        <Button  onClick     ={handleRight} text='Right'/>
        {right}
        <History allClicks   ={allClicks} />

        <Title title         ='Give Feedback'/>
        <Button onClick      ={handleGood}    text='Good'/>
        <Button onClick      ={handleBad}     text='Bad'/>
        <Button onClick      ={handleNeutral} text='Neutral'/>
        <Title title         ='Statistics'/>
        <Statistics textSum      ='Sum' 
                    textAverage  ='Average' 
                    textPositive ='Positive'
                    goodVal      ={feedback.good} 
                    badVal       ={feedback.bad} 
                    neutralVal   ={feedback.neutral}/>
        <br/>
        <Title   title = 'Anecdote'/>

        <Display text  = {votes.index + ' - ' + anecdoteText} />
        
        <Display text  = {'Has ' + votes.num[votes.index] + ' votes'} />
        <Button  text  = 'Vote' onClick={handleVote}/>
        <Button  text  = 'Next Anecdote' onClick={handleAnecdote}/>
        <Title   title = {'Anecdote ' + votes.mostVoteIdx + ' has the most vote of ' + votes.mostVoteVal}/>
        <Display text  = {votes.mostVoteIdx + ' - ' + anecdotes[votes.mostVoteIdx]} />
      </div>
    )
}

export default App;
