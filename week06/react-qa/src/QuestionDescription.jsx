import { Row, Col } from "react-bootstrap";

function QuestionDescription (props) {
    return(
        <>
        <Row>
            <Col md={6} as='p'>
                <strong>Question: #{props.question.id}</strong>
            </Col>
            <Col md={6} as='p' className='text-end'>
                Asked by {props.question.email}
            </Col>
        </Row>
        <Row>
            <Col md={12} as='p' className='lead'>
                {props.question.text}
            </Col>
        </Row>
        </>
    );
}

export default QuestionDescription;