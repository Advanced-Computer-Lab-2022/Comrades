
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
import ProgressBar from 'react-bootstrap/ProgressBar';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';


import ReportProblemIcon from '@mui/icons-material/ReportProblem';


import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'
import zIndex from "@mui/material/styles/zIndex";


// import { jsPDF } from "jspdf";
// const doc = new jsPDF();

// doc.text("Hello world!", 10, 10);
// doc.save("a4.pdf");





const CTMyCourses = () => {
    const { user } = useAuthContext()

    const [data, setData] = useState({});


    const [coursesInProgress, setCoursesInProgress] = useState([]);
    const [coursesCompleted, setCoursesCompleted] = useState([]);



    useEffect(() => {
        let userCoursesCompleted = []
        let userCoursesInProgress = []
        let progress = []

        const fetchUser = async () => {
            const data = { "Username": user.username }
            const response = await fetch("/api/users/getInstructorByID/{\"query\": \"" + user.username + "\"}")

            const json = await response.json()
            setData(json);
            for (let i = 0; i < json.SignedCourses.length; i++) {
                if (json.SignedCourses[i].IsCompleted) {

                    userCoursesCompleted.push(json.SignedCourses[i].CourseName);
                }
                else {
                    userCoursesInProgress.push(json.SignedCourses[i].CourseName);
                    progress = (parseInt(json.SignedCourses[i].NumSubtitles) / parseInt(json.SignedCourses[i].MaxNumSubtitles) * 100)
                }
            }


            const getCourseByName = async (name) => {
                console.log(name);
                const response = await fetch("/api/courses/getCourseByName/{\"id\": \"" + name + "\"}")
                const json = await response.json()
                return json
            }
            let arr = []
            for (let i = 0; i < userCoursesCompleted.length; i++) {
                let x = await getCourseByName(userCoursesCompleted[i])
                arr.push(x)
            }
            setCoursesCompleted(arr);
            arr = []
            for (let i = 0; i < userCoursesInProgress.length; i++) {
                let x = await getCourseByName(userCoursesInProgress[i])
                x.Progress = ((parseInt(json.SignedCourses[i].MaxNumSubtitles) - parseInt(json.SignedCourses[i].NumSubtitles)) / parseInt(json.SignedCourses[i].MaxNumSubtitles) * 100)
                arr.push(x)
            }
            setCoursesInProgress(arr);
            // console.log(arr)
            // console.log(coursesInProgress)
            // console.log("-------------------")
            // console.log(coursesCompleted)

        }
        if (user !== null) {
            if (user.username !== null)
                fetchUser();
        }




    }, [user])

    const { logout } = useLogout()

    const CheckEligable = () => {

    }

    const handleClickLogout = () => {
        logout()
    }



    const [reportedCourseName, setReportedCourseName] = useState("");

    
    const handleSubmit = (e, course) => {
        e.preventDefault();
        setReportedCourseName(course);
        handleShow();

    }

    const handleSubmit2 = async (e) => {
        e.preventDefault();

        const data = { "ProblemVal": details, "UserID": user.username, "ProblemType": type, "CourseID": reportedCourseName }

        const response = await fetch('/api/problems/createTestProblem', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (response.ok) {
            handleClose();
            handleShow2(true);    
        }
    }

    const handleSubmit3 = async (e) => {
        e.preventDefault();
    }

    const [type, setType] = useState("Financial")
    const [details, setDetails] = useState("Details")

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);


    function AlertDismissibleExample() {

        if (show2) {
            return (
                <Alert variant="success" onClose={() => setShow2(false)} dismissible>
                    <Alert.Heading>Problem have been reported!</Alert.Heading>
                    <p>
                        Sorry for the pain, hope it gets resolved too quick.
                    </p>
                </Alert>
            );
        }
    }

    const [show3, setShow3] = useState(false);

    function AlertDismissibleExample3() {

        if (show3) {
            return (
                <Alert variant="success" onClose={() => setShow3(false)} dismissible>
                    <Alert.Heading>Certificate was emailed to your email address.</Alert.Heading>
                </Alert>
            );
        }
    }

    const sendCertificate = async (e, cid) => {
        e.preventDefault();

        const data = { Username: user.username, CourseID: cid }

        const response = await fetch('/api/users/emailCertificate', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setShow3(true);

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
                    <AlertDismissibleExample />
                    <AlertDismissibleExample3 />
                    <br></br>

                    <Row>
                        <h2 style={{ paddingLeft: "400px" }}>
                            Your Courses
                        </h2>
                    </Row>
                    <br></br>
                    <Row>
                        <h3>
                            Graduated Courses
                        </h3>
                        {coursesCompleted && coursesCompleted.map((course => (
                            <Container className="course__card" key={course._id} >
                                <Card style={{ marginTop: "20px" }} className="course__card" key={course._id} >
                                    <Card.Header as="h6">
                                        {course.Title}
                                    </Card.Header>
                                    <Card.Body>
                                        <Button style={{ marginRight: "10px" }} variant="dark" onClick={() => window.location.href = `/oc?userId=${course._id}`} >View Course</Button>
                                        <Button variant="dark" onClick={(e) => sendCertificate(e, course.Title)} >Recieve Certificate Via Email </Button>

                                        <Button style={{ float: "right" }} variant="danger" onClick={(e) => handleSubmit(e, course.Title)} > <ReportProblemIcon></ReportProblemIcon>  </Button>

                                    </Card.Body>
                                </Card>
                            </Container>
                        )))}
                    </Row>
                    <hr></hr>
                    <Row>
                        <h3>
                            Current Courses
                        </h3>
                        {coursesInProgress && coursesInProgress.map((course => (
                            <Card style={{ marginTop: "20px" }} className="course__card" key={course._id} >
                                <Card.Header as="h6">
                                    {course.Title}
                                </Card.Header>
                                <Card.Body>
                                    <ProgressBar striped variant="success" now={course.Progress} label={`${course.Progress}%`} />
                                    <br></br>
                                    <Button style={{ marginRight: "10px" }} variant="dark" onClick={() => window.location.href = `/oc?userId=${course._id}`} >Continue Learning</Button>

                                    <Button style={{ float: "right" }} variant="danger" onClick={(e) => handleSubmit(e, course.Title)} > <ReportProblemIcon></ReportProblemIcon> </Button>

                                    {CheckEligable(course.Title)}
                                </Card.Body>
                            </Card>
                        )))}

                    </Row>

                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Report Problem with Course: {reportedCourseName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group style={{ textAlign: "left" }} className="mb-3" controlId="exampleForm.ControlInput1">
                            <h5>
                                Select your problem type.
                            </h5>
                            <p> Financial, Technical or Other </p>
                            <Form.Select aria-label="Default select example" onChange={(x) => setType(x.target.value)}>
                                <option value="Financial">Financial</option>
                                <option value="Technical">Technical</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group style={{ textAlign: "left" }} className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <h5>
                                Problem Details
                            </h5>
                            <p> Write in details as possible, make it easier for our admins. </p>
                            <Form.Control as="textarea" rows={3} onChange={(x) => setDetails(x.target.value)} />
                        </Form.Group>
                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={(e) => handleSubmit2(e)}>
                        Report
                    </Button>
                </Modal.Footer>
            </Modal>






        </div>
    )
}

export default CTMyCourses