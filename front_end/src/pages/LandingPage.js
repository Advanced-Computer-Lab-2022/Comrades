
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
import story from '../images/course.png'; // with import





const LandingPage = () => {

    return (
        <div className="home landingPageBG">
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

                                <Button href="/home" variant="outline-success" >Login </Button>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br></br>
            <br></br>
            <br></br>

            <Container>
                <Row>
                    <Col className="d-flex align-items-center">
                        <Container>
                            <h1>
                                Trust an experienced leader to overcome digital talent gaps.
                            </h1>
                            <br></br>
                            <p>
                                <span className="opacity__80">Compared with 21 vendors, </span><span className="pink__text">Comrades</span> <span className="opacity__80">is recognized for creating
                                    job-ready digital talent and delivering measurable business outcomes.</span>
                            </p>
                            <br></br>
                            <Button variant="success" size="lg">Sign Up</Button>
                            <Button variant="outline-success" className="landpage__login__btn" size="lg">View Courses</Button>
                            {/* <Button variant="primary" size="lg">Sign Up</Button>
                            <Button variant="outline-primary" className="landpage__login__btn" size="lg">View Courses</Button> */}
                        </Container>
                    </Col>
                    <Col>
                        {/* <img className="landingpage__story" src="https://www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/5xXfZXeMOuLCuQtKVue4Fl/0da3f8ab1f7dee8bb4fb0fdf75859688/IDC_Artwork_Desktop__1__1_.png?fm=webp&q=100" /> */}
                        <img className="landingpage__story" src={story} />
                    </Col>
                </Row>
            </Container>






        </div>
    )
}

export default LandingPage