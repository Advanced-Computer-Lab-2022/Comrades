
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Naavbar from "../components/Navbar"
import Footer from "../components/Footer/Footer"


import { useEffect, useState } from "react"

import "./Courses.css"




const OneCourse = () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const x = params.get('x');
    console.log(userId);
    const [course, setCourse] = useState([]);

    const [subtitle, setSubtitle] = useState([]);



    useEffect(() => {
        const getCourses = async () => {
            const response = await fetch("/api/courses/getCourseById/{\"id\": \"" + userId + "\"}")
            const json = await response.json()
            if (response.ok) {
                setCourse(json[0])

                setSubtitle(json[0].Subtitles)
            }


        }
        getCourses()
    }, [])




    return (
        // Title  Subject  Subtitles  Price  TotalHours  Rating  CreditHours  Discount
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Comrades</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* <NavDropdown title="Courses" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Math</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Computer</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Marketing</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">Business</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        <Nav className="d-flex gap-2">
                            <Form className="d-flex" >

                                <Button href="/home" variant="outline-light" >Login </Button>
                            </Form>
                            <Form className="d-flex">

                                <Button href="/home" variant="light" >Sign Up </Button>
                            </Form>

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="course__title__wrapper">
                <br></br>
                <br></br>

                <Row >
                    <Col className="d-flex justify-content-center">
                        <Container className="d-flex justify-content-center">
                            <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + course.Preview} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </Container>
                    </Col>
                    <Col xs={6}>
                        <h2 style={{ fontWeight: "bold", marginBottom: "0px" }}>
                            {course.Title}
                        </h2>
                        <h4 style={{ fontWeight: "500", opacity:"90%" }}>
                            {course.Subject}
                        </h4>
                        <h6>
                            {course.Description}
                        </h6>
                        <h6 style={{fontWeight:"700"}}>
                            USD {course.DiscountedPrice} ({course.Discount}%)
                        </h6>
                        <br></br>
                        <Button style={{ width: "140px" }} className="btn-dark" type="submit" variant="dark" onClick={() => { console.log({ country }) }}>Join Course</Button>
                        <br></br>
                        <br></br>
                        <h6>
                            Created By {course.Instructor}
                        </h6>
                        <h6>
                            Rating: {course.Rating} 🌟
                        </h6>

                    </Col>
                </Row>
                <br></br>
                <br></br>
            </div>
            <div className="course__content">
                <br></br>                
                <br></br>
                <br></br>
                <Container >
                    <h4>
                        Course Content
                    </h4>
                    {subtitle && subtitle.map((sub => (
                        <Row className="subtitles__wrapper">
                            <Col xs={11}>
                                <h5>          
                                                          {sub.Name}
                                </h5>
                            </Col>
                            <Col>
                                {sub.Hours} Hours
                            </Col>
                        </Row>
                    )))}



                </Container>
                <br></br>
                <br></br>
                <br></br>

            </div>
            <Footer/>
        </>


    )
}


export default OneCourse