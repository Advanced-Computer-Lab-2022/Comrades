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

import { useLogout } from '../hooks/useLogout'

import "./admin.css"

const NewUser = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('ct')
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = { "Email": email, "Username": name.toLowerCase(), "Password": password, "UserType": type }

        const response = await fetch('/api/users/createUserByAdmin', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setMsg(null)
            console.log(json.error)
            if (json.error.includes("Email_1 dup key")) {
                setError("Email already exists")
            }
            else if (json.error.includes("Username_1 dup key")) {
                setError("Username already exists")
            }
            else {
                setError("Please make sure you fill all boxes!")
            }
        }
        if (response.ok) {
            setError(null)
            setEmail('')
            setName('')
            setPassword('')
            setType('ct')
            if (json.UserType == 'ct')
                setMsg("New Corporate Trainee is Added Successfully")
            if (json.UserType == 'admin')
                setMsg("New Admin is Added Successfully")
            if (json.UserType == 'instructor')
                setMsg("New Instructor is Added Successfully")

            console.log('new user added:', json)


        }

    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { logout } = useLogout()

    const handleClickLogout = () => {
        logout()
    }



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

                                    <Button href="/" variant="outline-light" size="sm" onClick={handleClickLogout}>Logout </Button>
                                </Form>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Row>
                    <Col xs={2}>
                        <AdminSideNav id={0} />
                    </Col>
                    <Col className="d-flex align-items-center">
                        <Container className="d-flex justify-content-center">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <h3 style={{ paddingLeft: "0px", marginBottom: "20px" }}>
                                        Add User
                                    </h3>
                                    <Form.Label style={{ paddingLeft: "0px" }}>
                                        Email
                                    </Form.Label>
                                    <Form.Control className="input" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                </Form.Group>
                                <br></br>


                                <Form.Group as={Row} controlId="formPlaintextName">
                                    <Form.Label style={{ paddingLeft: "0px" }}>
                                        Username
                                    </Form.Label>
                                    <Form.Control className="input" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                                </Form.Group>
                                <br></br>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label style={{ paddingLeft: "0px" }}>
                                        Password
                                    </Form.Label>
                                    <Form.Control className="input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                </Form.Group>
                                <br></br>

                                <Form.Group as={Row} >
                                    <Form.Label style={{ paddingLeft: "0px" }}>
                                        Select User Type
                                    </Form.Label>
                                    <Form.Select className="input" onChange={(e) => setType(e.target.value)} value={type}>
                                        <option value="ct">Corporate Trainee</option>
                                        <option value="admin">Admin</option>
                                        <option value="instructor">Instructor</option>
                                    </Form.Select>


                                </Form.Group>
                                <br></br>
                                <Button style={{ marginLeft: "-10px" }} type="submit" variant="dark" onClick={handleShow}>Add User</Button>

                            </Form>
                        </Container>

                    </Col>
                </Row>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Results</Modal.Title>
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


export default NewUser