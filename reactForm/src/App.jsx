
import {Question, Answer} from './models/QAModels.mjs'
import NavHeader from './components/NavHeader'
import QuestionDescription from './components/QuestionDescription'
import Answers from './components/Answers'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer'
import './App.css'
import { useState } from 'react';


const fakeQuestion = new Question(1, "Is Javascript better than Python?", "luigi.derussis@polito.it", "2023-10-01");
fakeQuestion.init();
const fakeAswers = fakeQuestion.getAnswers();

function App() {
  const [question, setQuestion] = useState(fakeQuestion);
  const [answers, setAnswers] = useState(fakeAswers);
  
  const voteUp = (answersId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(ans => {
        if(ans.id === answersId)
          return new Answer(ans.id, ans.text, ans.email, ans.userId, ans.date, ans.score + 1);
        else
          return ans;
      })
    })
  }

  const addAnswer = (answer) => {
    setAnswers(oldAnswers => {
      const newId = Math.max(...oldAnswers.map(ans => ans.id)) +1;
      const newAnswer = new Answer(newId, answer.text, answer.email, undefined, answer.date);
      return [...oldAnswers, newAnswer];
    })
  }

  const updateAnswer = (answer) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(ans => {
        if(ans.id === answer.id)
          return new Answer(answer.id, answer.text, answer.email, ans.score, answer.date);
        else
          return ans;
      })
    })
  }

  return (
    <>
    <NavHeader questionNum = {question.id}/>
    <Container fluid className= 'mt-3'>
      <QuestionDescription question={question}></QuestionDescription>
      <Answers answers={answers} voteUp={voteUp} addAnswer={addAnswer} updateAnswer={updateAnswer}></Answers>
      <Footer fluid className='footer'></Footer>
    </Container>
    </>
  )
}

export default App
