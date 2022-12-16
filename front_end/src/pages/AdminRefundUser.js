import { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import AdminSideNav from "./Admin/AdminSideNav"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



import "./admin.css"

const AdminRefundUser = () => {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(Number)
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { "Username": name, "Amount": amount }

        const response = await fetch('/api/users/issueRefund', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setMsg(null)
            setError(json.error)
        }
        if (response.ok) {
            setError(null)
            setName('')
            setAmount(0)
            setError(null)
            setMsg("Refund process is completed")



        }

    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (

        <>
            <div className="home">

                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">Comrades</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavDropdown title="Courses" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Math</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Computer</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Marketing</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4">Business</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <Form className="d-flex" >

                                    <Button href="/" variant="outline-light" size="sm">Log Out </Button>
                                </Form>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Row>
                    <Col xs={2}>
                        <AdminSideNav id={2}/>
                    </Col>
                    <Col className="d-flex align-items-center">
                        <Container className="d-flex justify-content-center">
                            <Form onSubmit={handleSubmit}>

                                <Form.Group as={Row} controlId="formPlaintextName">
                                    <h3 style={{ paddingLeft: "0px", marginBottom: "20px" }}>
                                        Issue Refund
                                    </h3>
                                    <Form.Label style={{ paddingLeft: "0px" }}>
                                        Trainee Name
                                    </Form.Label>
                                    <Form.Control className="input" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                                </Form.Group>
                                <br></br>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label style={{ paddingLeft: "0px" }}>
                                        Amount
                                    </Form.Label>
                                    <Form.Control className="input" type="number"  onChange={(e) => setAmount(e.target.value)} value={amount} />
                                </Form.Group>
                                <br></br>
                                <Button style={{ marginLeft: "-10px" }} type="submit" variant="dark" onClick={handleShow}>Issue Refund</Button>

                            </Form>
                        </Container>

                    </Col>
                </Row>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Refund Results</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{error} {msg}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>

        </>

    )
}


export default AdminRefundUser