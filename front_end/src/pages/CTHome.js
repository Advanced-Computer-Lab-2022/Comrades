
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import Naavbar from "../components/Navbar"

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CTSideNav from "./CT/CTSideNav";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'


// import { jsPDF } from "jspdf";
// const doc = new jsPDF();

// doc.text("Hello world!", 10, 10);
// doc.save("a4.pdf");





const CTHome = () => {
    const { user } = useAuthContext()

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const data = { "Username": user.username }
            const response = await fetch("/api/users/getInstructorByID/{\"RequestID\": \"" + user.username + "\"}")

            const json = await response.json()
            setData(json);
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
                    <CTSideNav />
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
                </Col>
            </Row>






        </div>
    )
}

export default CTHome