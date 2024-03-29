import { useEffect, useState } from 'react'

import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import Naavbar from "../components/Navbar"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ITSideNav from "./IT/ITSideNav";

import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'



const ITHome = () => {

    const { user } = useAuthContext()

    const [data, setData] = useState({});
    const [password, setPassword] = useState("");



    useEffect(() => {
        let userCourses = [];
        const fetchUser = async () => {
            const data = { "Username": user.username }
            const response = await fetch("/api/users/getInstructorByID/{\"RequestID\": \"" + user.username + "\"}")

            const json = await response.json()
            setData(json);
            for (let i = 0; i < json.SignedCourses.length; i++) {
                userCourses.push(json.SignedCourses[i].CourseName);
            }
        }
        if (user !== null) {
            if (user.username !== null)
                fetchUser();
        }


    }, [user])

    const { logout } = useLogout()

    const handleClickLogout = () => {
        logout()
    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("/api/users/changePasswordNoToken/{\"Token\": \"" + user.username + "\",\"Password\": \"" + password + "\"}", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (response.ok) {
            console.log(json)
        }
    }


    return (
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
                    <ITSideNav />
                </Col>
                <Col>
                    <br></br>
                    <br></br>
                    <br></br>

                    <Row>
                        <h2>
                            {"👋 " + data.Username + ", Enjoy your stay!"}
                        </h2>
                    </Row>
                    <Row style={{ paddingLeft: "48px", marginTop: "40px" }}>
                        <h4>
                            {"Your Wallet: $" + data.Wallet}
                        </h4>
                        <p style={{ fontStyle: "italic" }}>
                            Note: We always issue refunds in USD!
                        </p>
                    </Row>
                    <br></br>
                    <Button variant="dark" onClick={handleShow}>
                        Change Password
                    </Button>


                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>

                            <Form.Group controlId="formPlaintextEmail">
                                <Form.Label>
                                    Enter New Password
                                </Form.Label>
                                <br></br>
                                <Form.Control className="input" type="text" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                            </Form.Group>
                        </Container>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>






        </div>
    )
}

export default ITHome