
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
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';


import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'





const CTRequestCourseAccess = () => {


    const [courses, setCourses] = useState([])
    const [course, setCourse] = useState("Select Course")
    const [show, setShow] = useState(false);


    const { user } = useAuthContext()
    const [data, setData] = useState({});




    const handleSubmit = async (e) => {
        e.preventDefault()
        if (course == "Select Course")
            console.log("no course selected")
        else {
            const data = { "CourseID": course, "UserID": user.username, "Status": "Pending" }

            const response = await fetch('/api/courseRequests/createCourseRequest', {
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
    }


    useEffect(() => {
        let userCourses = [];
        const fetchUser = async () => {
            const data = { "Username": user.username }
            const response = await fetch("/api/users/getInstructorByID/{\"RequestID\": \"" + user.username + "\"}")

            const json = await response.json()
            console.log(json);
            setData(json);
            for (let i = 0; i < json.SignedCourses.length; i++) {
                userCourses.push(json.SignedCourses[i].CourseName);
            }
        }
        const fetchCourses = async () => {
            const response = await fetch('/api/courses/getCourses')
            const json = await response.json()
            let json2 = []
            if (response.ok) {
                for (let i = 0; i < json.length; i++) {
                    console.log(json[i].Title)
                    if (userCourses.includes(json[i].Title))
                        continue;
                    else
                        json2.push(json[i].Title)
                }
                setCourses(json2)
            }
        }

        if (user !== null) {
            if (user.username !== null){
                fetchUser();
                fetchCourses()
            }
        }
    }, [user])

    function AlertDismissibleExample() {

        if (show) {
            return (
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Access is now requested for the course: {course}</Alert.Heading>
                    <p>
                        Feel like its taking too long? Contact an admin!
                    </p>

                </Alert>
            );
        }
    }

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
                    <br></br>
                    <br></br>
                    <br></br>
                    <AlertDismissibleExample />
                    <Form onSubmit={handleSubmit} style={{ marginLeft: "350px" }}>
                        <Form.Group as={Row} className="mb-3" style={{ padding: "0px" }}>
                            <h4 style={{ textAlign: "left", margin: "0px" }}>Select Course</h4>

                            <Form.Select style={{ margin: "10px", width: "200px", marginBottom: "0px" }} className="input" onChange={(e) => setCourse(e.target.value)} value={course}>
                                <option>
                                    Select Course
                                </option>

                                {courses.map(d => (
                                    <>
                                        <option value={d}>
                                            {d}
                                        </option>
                                    </>
                                )
                                )}
                            </Form.Select>
                            <Button style={{ width: "140px", margin: "5px 0px 0px 10px" }} type="submit" variant="dark" onClick={() => { console.log({ course }) }}>Request Course</Button>

                        </Form.Group>
                    </Form>

                </Col>
            </Row>





        </div>
    )
}

export default CTRequestCourseAccess