import { Row, Col } from "react-bootstrap";
import { Link } from "react-router";

function Questions(props) {

  return(
    <Row>
      <Col>
        <h1>Welcome to HeapOverrun!</h1>
        <p className="lead">We have {props.questions.length} questions...</p>
      </Col>
      <Row>
        <Col>
        <dl>
          { props.questions.map((q) => <dd key={q.id}><Link to={`/questions/${q.id}`}>{q.text}</Link></dd>)}
        </dl>
        </Col>
      </Row>
    </Row>
  );
}

export default Questions;