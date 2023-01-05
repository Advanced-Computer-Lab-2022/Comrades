
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Alert from 'react-bootstrap/Alert';


import Naavbar from "../components/Navbar"
import Footer from "../components/Footer/Footer"


import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

import "./Courses.css"




const ViewCourse = () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');

    const { user } = useAuthContext()

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



    const handleSubmit = async (e) => {
        e.preventDefault();


        const response0 = await fetch("/api/courses/getCourseById/{\"id\": \"" + userId + "\"}")
        const json = await response0.json()

        console.log(json[0].Subtitles)

        const data = { "Username": user.username, "CourseName": course.Title, "NumSubtitles": json[0].Subtitles.length, "AmountPaid": json[0].DiscountedPrice }

        const response1 = await fetch('/api/users/addCourseToUser', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data3 = { "CourseID": course.Title }

        const response3 = await fetch('/api/courses/incrementPopularity', {
            method: 'POST',
            body: JSON.stringify(data3),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data4 = { "Username": course.Instructor, "Amount": (course.DiscountedPrice)*0.5 }

        const response4 = await fetch('/api/users/issueRefund', {
            method: 'POST',
            body: JSON.stringify(data4),
            headers: {
                'Content-Type': 'application/json'
            }
        })


        setShow(false);
        setShow1(true);
        setShow2(false);
    }

    const handleSubmit10 = async (e) => {
        e.preventDefault();


        const response0 = await fetch("/api/courses/getCourseById/{\"id\": \"" + userId + "\"}")
        const json = await response0.json()

        console.log(json[0].Subtitles)

        const data = { "Username": user.username, "CourseName": course.Title, "NumSubtitles": json[0].Subtitles.length, "AmountPaid": json[0].DiscountedPrice }

        const response1 = await fetch('/api/users/addCourseToUser', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data3 = { "CourseID": course.Title }

        const response3 = await fetch('/api/courses/incrementPopularity', {
            method: 'POST',
            body: JSON.stringify(data3),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data4 = { "Username": course.Instructor, "Amount": (course.DiscountedPrice)*0.5 }

        const response4 = await fetch('/api/users/issueRefund', {
            method: 'POST',
            body: JSON.stringify(data4),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data5 = { "Username": user.username, "Amount": (course.DiscountedPrice)*-1 }

        const response5 = await fetch('/api/users/issueRefund', {
            method: 'POST',
            body: JSON.stringify(data5),
            headers: {
                'Content-Type': 'application/json'
            }
        })


        setShow(false);
        setShow1(true);
        setShow2(false);
    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [show1, setShow1] = useState(false);

    function AlertDismissibleExample() {
      
        if (show1) {
          return (
            <Alert variant="success" onClose={() => setShow1(false)} dismissible>
              <Alert.Heading>Signed up for course</Alert.Heading>
              <p>
                Click on login to redirect to your profile.
              </p>
            </Alert>
          );
        }
      }
      


      const [show2, setShow2] = useState(true);


      function btn() {
        if(show2){
            return (
            <Button style={{ width: "140px" }} className="btn-dark" type="submit" variant="dark" onClick={() => { handleShow() }}>Join Course</Button>
            )
        }
      }


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
                {AlertDismissibleExample()}
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
                        <h4 style={{ fontWeight: "500", opacity: "90%" }}>
                            {course.Subject}
                        </h4>
                        <h6>
                            {course.Description}
                        </h6>
                        <h6 style={{ fontWeight: "700" }}>
                            USD {course.DiscountedPrice} ({course.Discount}%)
                        </h6>
                        <br></br>
                        {btn()}
                        <br></br>
                        <br></br>
                        <h6>
                            Created By {course.Instructor}
                        </h6>
                        <h6>
                            Rating: {course.Rating} 🌟
                        </h6>
                        <h6>
                            Total Hours: {course.TotalHours}
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
                            <Col xs={10}>
                                <h5>
                                    {sub.Name}
                                </h5>
                            </Col>
                            <Col>
                                {sub.Exercises.length} Exercise ◍  {sub.Hours} Hours
                            </Col>
                        </Row>
                    )))}



                </Container>
                <br></br>
                <br></br>
                <br></br>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Payment page</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="container p-0">
                            <div class="card px-4">
                                <p class="h8 py-3">Payment Details</p>
                                <div class="row gx-3">
                                    <div class="col-12">
                                        <div class="d-flex flex-column">
                                            <p class="text mb-1">Person Name</p>
                                            <input class="form-control mb-3" type="text" placeholder="Name">
                                            </input>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="d-flex flex-column">
                                            <p class="text mb-1">Card Number</p>
                                            <input class="form-control mb-3" type="text" placeholder="1234 5678 435678">
                                            </input>

                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="d-flex flex-column">
                                            <p class="text mb-1">Expiry</p>
                                            <input class="form-control mb-3" type="text" placeholder="MM/YYYY">
                                            </input>

                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="d-flex flex-column">
                                            <p class="text mb-1">CVV/CVC</p>
                                            <input class="form-control mb-3 pt-2 " type="password" placeholder="***">
                                            </input>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="btn btn-dark mb-3">
                                            <span class="ps-3" onClick={handleSubmit}>Pay ${course.DiscountedPrice}</span>
                                            <span class="fas fa-arrow-right"></span>
                                        </div>
                                        <br></br>
                                        <button class="btn btn-dark mb-3" onClick={handleSubmit10}>
                                            Pay by wallet
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
            <Footer />
        </>


    )
}


export default ViewCourse