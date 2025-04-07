
import {Question} from './QAModels.mjs'
import NavHeader from './components/NavHeader'
import QuestionDescription from './QuestionDescription'
import Answers from './Answers'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer'
import './App.css'
import { useState } from 'react';


const fakeQuestion = new Question(1, "Is Javascript better than Python?", "luigi.derussis@polito.it", "2023-10-01");
fakeQuestion.init();
const fakeAswers = fakeQuestion.getAnswers();

function App() {
  const [question, setQuestion] = useState(fakeQuestion);
  const [answers, setAnswers] = useState(fakeAswers);
  return (
    <>
    <NavHeader questionNum = {question.id}/>
    <Container fluid className= 'mt-3'>
      <QuestionDescription question={question}></QuestionDescription>
      <Answers answers={answers}></Answers>
      <Footer fluid className='footer'></Footer>
    </Container>
    </>
  )
}

export default App
