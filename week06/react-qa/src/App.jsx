<<<<<<< HEAD

import {Question} from './QAModels.mjs'
import NavHeader from './NavHeader'
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
=======
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Container } from "react-bootstrap";

import { Question } from "./models/QAModels.mjs";
import NavHeader from "./components/NavHeader";
import QuestionDescription from "./components/QuestionDescription";
import Answers from "./components/Answers";

const fakeQuestion = new Question(1, "Is JavaScript better than Python?", "luigi.derussis@polito.it", 1, "2025-02-28");
fakeQuestion.init();
const fakeAnswers = fakeQuestion.getAnswers();

function App() {
  const [question, setQuestion] = useState(fakeQuestion);
  const [answers, setAnswers] = useState(fakeAnswers);

  return (
    <>
      <NavHeader questionNum={question.id} />
      <Container fluid className="mt-3">
        <QuestionDescription question={question} />
        <Answers answers={answers} setAnswers={setAnswers} />
      </Container>
    </>
  )

}

export default App;
>>>>>>> 4c1f8db243d0ba38ac5955c796e3c5b6c788a330
