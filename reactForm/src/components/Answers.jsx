import {Row, Col} from 'react-bootstrap';   
import { Table, Button } from 'react-bootstrap';
import { Answer } from '../QAModels.mjs';
import "bootstrap-icons/font/bootstrap-icons.css";
import AnswerForm from '../../../week07/react-qa/src/components/AnswerForm';
import { useState } from 'react';

function Answers (props){

    const [mode, setMode] = useState('view'); // 'view' or 'edit'
    const [editableAnswer, setEditableAnswer] = useState(); // for edit mode

    const handleEdit = (answer) => {
        setEditableAnswer(answer);
        setMode('edit');
    }

    return(
        <>
        <Row>
            <Col as='h2'>Answers:</Col>
        </Row>
        <Row>
            <Col lg={10} className = 'mx-auto'>
                <AnswerTable answers={props.answers} voteUp={props.voteUp}></AnswerTable>
                {mode === 'view' && <Button variant="primary" onClick={() => {setMode('add');}}>Add</Button>}
                {mode === 'add' && <AnswerForm addAnswer={(answer) => {props.addAnswer(answer); setMode('view');}} cancel={() => setMode('view')}></AnswerForm>}
                {mode === 'edit' && <AnswerForm answer={editableAnswer} updateAnswer={(answer) => {props.updateAnswer(answer); setMode('view');}} cancel={() => setMode('view')} mode={mode}></AnswerForm>}
            </Col>
        </Row>
        </>
    );
}

function AnswerTable (props){
    return(
        <Table striped>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Text</th>
                    <th>Author</th>
                    <th>Score</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.answers.map((ans) => <AnswerRow answer={ans} key={ans.id} voteUp={props.voteUp} handleEdit={props.handleEdit}></AnswerRow>)} 
            </tbody>
        </Table>
    );
}

function AnswerRow (props){
    return(
        <tr>
            <AnswerData answer={props.answer}></AnswerData>
            <AnswerAction voteUp={props.voteUp} answer={props.answer} handleEdit={props.handleEdit}></AnswerAction>
        </tr>
    );
}

function AnswerData (props){
    return(
        <>
        <td>{props.answer.date.format('YYYY-MM-DD')}</td>
        <td>{props.answer.text}</td>
        <td>{props.answer.email}</td>
        <td>{props.answer.score}</td>
        </>
    );
}

function AnswerAction(props) {
    return(
      <td>
        <Button variant="warning" onClick={() => {props.voteUp(props.answer.id)}}><i className="bi bi-arrow-up" /></Button>
        <Button variant="primary" className="mx-1" onClick={() => {props.handleEdit(props.answer)}}><i className="bi bi-pencil-square" /></Button> 
        <Button variant="danger"><i className="bi bi-trash" /></Button>
      </td>
    );
  }

export default Answers;