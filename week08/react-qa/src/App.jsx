import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import { Question, Answer } from "./models/QAModels.mjs";
import QuestionDescription from "./components/QuestionDescription";
import Answers from "./components/Answers";
import { AnswerForm, EditAnswerForm } from "./components/AnswerForm";
import { Routes, Route } from "react-router";
import DefaultLayout from "./components/DefaultLayout";
import Questions from "./components/Questions";

const fakeQuestion = new Question(1, "Is JavaScript better than Python?", "luigi.derussis@polito.it", 1, "2025-02-28");
fakeQuestion.init();
const fakeAnswers = fakeQuestion.getAnswers();

function App() {
  const [questions, setQuestions] = useState([fakeQuestion]);
  const [answers, setAnswers] = useState(fakeAnswers);

  const voteUp = (answerId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(ans => {
        if(ans.id === answerId)
          return new Answer(ans.id, ans.text, ans.email, ans.userId, ans.date, ans.score +1);
        else
          return ans;
      });
    });
  }

  const addAnswer = (answer) => {
    setAnswers(oldAnswers => {
      // temporaneo
      const newId = Math.max(... oldAnswers.map(ans => ans.id)) + 1;
      const newAnswer = new Answer(newId, answer.text, answer.email, undefined, answer.date);
      return [...oldAnswers, newAnswer];
    });
  }

  const updateAnswer = (answer) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(ans => {
        if(ans.id === answer.id)
          return new Answer(answer.id, answer.text, answer.email, ans.userId, answer.date, ans.score);
        else
          return ans;
      });
    });
  }

  const deleteAnswer = (answerId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.filter((answer) => answer.id !== answerId); 
    });
  }

  {/* ROUTES
    
    - / => tutte le domande (index)
    - /questions/:qid => domanda "id" con le sue risposte

    OPZIONE 1:
    - /questions/:qid/answers/new => nuova risposta
    - /questions/:qid/answers/:aid/edit => modifica risposta

    OPZIONE 2:
    - /answers/:aid/edit => modifica risposta

    - * => pagina not found

    */}

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Questions questions={questions}/>} />
        <Route path="/questions/:questionId" element={<QuestionDescription questions={questions} />} >
          <Route index element={<Answers answers={answers} voteUp={voteUp} addAnswer={addAnswer} editAnswer={updateAnswer} deleteAnswer={deleteAnswer} />} />
          <Route path="answers/new" element={<AnswerForm addAnswer={addAnswer}/>}/>
          <Route path="answers/:answerId/edit" element={<EditAnswerForm editAnswer={updateAnswer} answers={answers} />}/>
        </Route>
        <Route path="*" element={<p>Pagina non trovata</p>} />
      </Route>
    </Routes>
  )

}

export default App;