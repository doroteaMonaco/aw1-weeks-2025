import { Container, Navbar } from 'react-bootstrap'
import PropTypes from 'prop-types'

function NavHeader (props){
    return(
        <Navbar bg='primary' data-bs-theme='dark'>
        <Container fluid>
            <Navbar.Brand>HeapOverrun - Question {props.questionNum}</Navbar.Brand>
        </Container>
        </Navbar>
    )
}

NavHeader.propTypes = {
    questionNum: PropTypes.number.isRequired //solo per togliere warning se compare il prop
}

export default NavHeader;