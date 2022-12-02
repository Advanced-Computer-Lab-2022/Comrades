
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import Naavbar from "../components/Navbar"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SideNav from "../components/SideNavbar/SideNav";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./LandingPageStyle.css"




const LandingPage = () => {

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

                                <Button href="/Profile" variant="success" >Account </Button>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Container>
                <Row>
                    <Col>
                        <h1>
                            Trust an experienced leader to overcome digital talent gaps.
                        </h1>
                        <p>
                            Compared with 21 vendors, Comrades is recognized for creating
                            job-ready digital talent and delivering measurable business outcomes.


                        </p>
                    </Col>
                    <Col>2 of 2</Col>
                </Row>
            </Container>






        </div>
    )
}

export default LandingPage