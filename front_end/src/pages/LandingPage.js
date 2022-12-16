
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import Naavbar from "../components/Navbar"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LanguageIcon from '@mui/icons-material/Language';
import SideNav from "../components/SideNavbar/SideNav";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./LandingPageStyle.css"
import story from '../images/course.png'; // with import
import Footer from "../components/Footer/Footer"






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

                                <Button href="/login" variant="outline-light" >Login </Button>
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
                                <span className="opacity__80">Compared with 22 vendors, </span><span className="pink__text">Comrades</span> <span className="opacity__80">is recognized for creating
                                    job-ready digital talent and delivering measurable business outcomes.</span>
                            </p>
                            <br></br>
                            <Button href="signup" variant="light" size="lg">Sign Up</Button>
                            <Button href="/gc" variant="outline-light" className="landpage__login__btn" size="lg">View Courses</Button>
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
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Container className="partners__wrapping">
                <Row>
                    <Col>
                        <h1 class="text-center partners__text" >
                            Trusted by our partners
                        </h1>
                    </Col>
                </Row>
                <br></br>
                <br></br>
                <br></br>

                <Row>
                    <Col>
                        <Container className="d-flex justify-content-center">

                            <img style={{ width: 100 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png" />
                        </Container>
                    </Col>
                    <Col>
                        <Container className="d-flex justify-content-center">
                            <img style={{ width: 100 }} src="https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png" />
                        </Container>
                    </Col>
                    <Col>
                        <Container className="d-flex justify-content-center">
                            <img style={{ width: 100 }} src="https://upload.wikimedia.org/wikipedia/commons/f/f4/BMW_logo_%28gray%29.svg" />
                        </Container>

                    </Col>
                    <Col>
                        <Container className="d-flex justify-content-center">
                            <img style={{ width: 100 }} src="https://logos-world.net/wp-content/uploads/2020/04/Airbus-Logo.png" />
                        </Container>

                    </Col>
                    <Col>
                        <Container className="d-flex justify-content-center">
                            <img style={{ width: 100 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/862px-Mercedes-Logo.svg.png" />
                        </Container>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Footer/>








        </div>
    )
}

export default LandingPage