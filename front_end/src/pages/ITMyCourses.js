
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import Naavbar from "../components/Navbar"

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ITSideNav from "./IT/ITSideNav";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';




import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'
import zIndex from "@mui/material/styles/zIndex";


// import { jsPDF } from "jspdf";
// const doc = new jsPDF();

// doc.text("Hello world!", 10, 10);
// doc.save("a4.pdf");





const ITMyCourses = () => {
    const { user } = useAuthContext()

    const [data, setData] = useState({});
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const [email, setEmail] = useState("");

    const [coursesInProgress, setCoursesInProgress] = useState([]);
    const [coursesCompleted, setCoursesCompleted] = useState([]);



    useEffect(() => {
        let userCoursesCompleted = []
        let userCoursesInProgress = []
        let progress = []

        const fetchUser = async () => {
            const data = { "Username": user.username }
            const response = await fetch("/api/users/getInstructorByID/{\"RequestID\": \"" + user.username + "\"}")

            const json = await response.json()
            setEmail(json.Email)
            console.log(json.Email)
            console.log(email)
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
                const response = await fetch("/api/courses/getCourseByName/{\"RequestID\": \"" + name + "\"}")
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




    }, [user,show])

    const handleSubmit = async (e,title) => {
        e.preventDefault();

        const data = { "Username": user.username, "CourseID": title }

        const response = await fetch('/api/users/requestRefund', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (response.ok) {
            setShow(true);
        }
    }

    const handleSubmit2 = async (e,title) =>{
        e.preventDefault();

        const data = { "Username": user.username, "Email": email, "CourseID": title }

        const response = await fetch('/api/users/requestRefund', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (response.ok) {
            setShow2(true);
        }

    }

    const { logout } = useLogout()

    const handleClickLogout = () => {
        logout()
    }

    const CheckEligable = (title) => {
        for (let i = 0; i < coursesInProgress.length; i++) {
            if (coursesInProgress[i].Title === title)
                if (coursesInProgress[i].Progress < 50) {
                    return <Button variant="dark" onClick={(e) => handleSubmit(e, title)} >Request Refund </Button>

                }
        }
    }

    function AlertDismissibleExample() {

        if (show) {
            return (
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Course was refunded and amount is added to your wallet.</Alert.Heading>
                </Alert>
            );
        }
    }

    function AlertDismissibleExample2() {

        if (show) {
            return (
                <Alert variant="success" onClose={() => setShow2(false)} dismissible>
                    <Alert.Heading>Certificate was emailed to your email address.</Alert.Heading>
                </Alert>
            );
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
                    <AlertDismissibleExample />
                    <AlertDismissibleExample2 />
                    <br></br>
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
                                <Card style={{ marginTop: "20px" }} className="course__card" key={course._id} onClick={() => window.location.href = `/vc?userId=${course._id}`}>
                                    <Card.Header as="h6">
                                        {course.Title}
                                    </Card.Header>
                                    <Card.Body>
                                        <Button style={{ marginRight: "10px" }} variant="dark" onClick={() => window.location.href = `/vc?userId=${course._id}`} >View Course</Button>
                                        <Button variant="dark" onClick={() => window.location.href = `/vc?userId=${course._id}`} >Recieve Certificate Via Email </Button>
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
                                    <Button style={{ marginRight: "10px" }} variant="dark" onClick={() => window.location.href = `/vc?userId=${course._id}`} >Continue Learning</Button>
                                    {CheckEligable(course.Title)}
                                </Card.Body>
                            </Card>
                        )))}

                    </Row>

                </Col>
            </Row>






        </div>
    )
}

export default ITMyCourses