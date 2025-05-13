import { useActionState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import dayjs from "dayjs";

function AnswerForm(props) {
<<<<<<< HEAD
    const initialState = {
        text: props.answer ? props.answer.text : "",
        email: props.answer ? props.answer.email : "",
        date: props.answer ? props.answer.date.format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"),
    };
=======
  
  const initialState = {
    text: props.answer?.text,
    email: props.answer?.email,
    date: props.answer?.date ?? dayjs()
  };
  
  const handleSubmit = async (prevState, formData) => {
    // creo un oggetto {} dal FormData
    const answer = Object.fromEntries(formData.entries());
>>>>>>> 67944448cd31e2a48815eb125cd47ea3742cb81b

    const handleSubmit = async (prevState, formData) => {
        const answer = Object.fromEntries(formData.entries());

        if(answer.text.trim() === "") {
            answer.error = "The answer can't be empty, please fix it!";
            return answer;
        }

        if(props.mode === 'edit') {
            props.updateAnswer({id: props.answer.id, ...answer});
        }
        else {
            props.addAnswer(answer);
        }
        return initialState;
    }
<<<<<<< HEAD

    const [state, formAction] = useActionState(handleSubmit, initialState);
=======
    
    if(props.addAnswer)
      // aggiungo la risposta allo stato in App
      props.addAnswer(answer);
    else
      props.editAnswer({id: props.answer.id, ...answer});
>>>>>>> 67944448cd31e2a48815eb125cd47ea3742cb81b

    return(
        <>
            { state.error && <Alert variant="secondary">{state.error}</Alert> } {/*se l'oggetto state ha una proprietà error, allora la stampo*/}
            <Form action={formAction}>
                <Form.Group className="mb-3">
                    <Form.Label>Text</Form.Label>
                    <Form.Control name="text" type="text" required={true} minLength={2} defaultValue={state.text}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="text" required={true} minLength={2} defaultValue={state.email}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control name="date" type="date" required={true} min={dayjs().format("YYYY-MM-DD")} defaultValue={state.date}></Form.Control>
                </Form.Group>
                {props.mode === 'add' && <Button variant="success" type="submit">Add</Button>}
                {props.mode === 'edit' && <Button variant="success" type="submit">Update</Button>}
                <Button variant="danger" onClick={props.cancel}>Cancel</Button>
            </Form>
        </>
    )

<<<<<<< HEAD
=======
  const [state, formAction] = useActionState(handleSubmit, initialState);

  return(
    <>
      { state.error && <Alert variant="secondary">{state.error}</Alert> }
      <Form action={formAction}>
        <Form.Group className="mb-3">
          <Form.Label>Text</Form.Label>
          <Form.Control name="text" type="text" required={true} minLength={2} defaultValue={state.text}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>email</Form.Label>
          <Form.Control name="email" type="email" required={true} defaultValue={state.email}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" type="date" required={true} min={dayjs().format("YYYY-MM-DD")} defaultValue={state.date.format("YYYY-MM-DD")}></Form.Control>
        </Form.Group>
        { props.addAnswer && <Button variant="primary" type="submit">Add</Button> }
        { props.editAnswer && <Button variant="success" type="submit">Update</Button> }
        {" "}
        <Button variant="danger" onClick={props.cancel}>Cancel</Button>
      </Form>
    </>
  );
>>>>>>> 67944448cd31e2a48815eb125cd47ea3742cb81b
}

export default AnswerForm;