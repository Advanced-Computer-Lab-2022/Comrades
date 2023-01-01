
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


import AdminSideNav from "./Admin/AdminSideNav"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Table from 'react-bootstrap/Table';


import { useEffect, useState } from "react"
import { useLogout } from '../hooks/useLogout'

import "./admin.css"
import { ProblemModal, ModalOpenButton, ModalContents } from '../components/ProblemModal'

const AdminCourseRequests = () => {

    const [problems, setProblems] = useState([])
    const [show, setShow] = useState(false);


    useEffect(() => {
        const fetchProblems = async () => {
            const response = await fetch('/api/courseRequests/getAllRequests')
            const json = await response.json()
            setProblems(json)
        }
        fetchProblems()
    }, [problems])

    const handleSubmit = async (e, id, CourseID, UserID) => {
        console.log(CourseID);
        const response0 = await fetch("/api/courses/getCourseByName/{\"id\": \"" + CourseID + "\"}")
        const json = await response0.json()


        const data = { "Username": UserID, "CourseName": CourseID, "NumSubtitles": json.Subtitles.length }

        const response1 = await fetch('/api/users/addCourseToUser', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data2 = { "RequestID": id }

        const response2 = await fetch('/api/courseRequests/updateRequestStatus', {
            method: 'POST',
            body: JSON.stringify(data2),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data3 = { "CourseID": CourseID }

        const response3 = await fetch('/api/courses/incrementPopularity', {
            method: 'POST',
            body: JSON.stringify(data3),
            headers: {
                'Content-Type': 'application/json'
            }
        })


        setShow(true);

    }

    function AlertDismissibleExample() {

        if (show) {
            return (
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Access was granted!</Alert.Heading>
                </Alert>
            );
        }
    }

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
                    <AdminSideNav id={1} />
                </Col>
                <Col className="d-flex align-items-center">

                    <Col>
                        <AlertDismissibleExample />
                        <Row>
                            <h3 style={{ margin: "30px 0px 0px 6px" }}>
                                Corporate Trainee Course Requests
                            </h3>
                            <h6 style={{ margin: "6px 0px 0px 6px", opacity: "90%" }}>
                                Click on a <span style={{ fontWeight: "bold", fontStyle: "italic" }}>Grant Access</span> to give user access to this course.
                            </h6>
                        </Row>
                        <Row>
                            <Container className="d-flex justify-content-center">
                                <Table striped bordered hover style={{ margin: "40px 0px" }}>
                                    <thead>
                                        <tr>
                                            <th>Course Name</th>
                                            <th>User Name</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {problems && problems.map((problem => (
                                            <tr key={problems._id}>
                                                <td>
                                                    {problem.CourseID}
                                                </td>
                                                <td>
                                                    {problem.UserID}
                                                </td>
                                                <td>
                                                    {problem.Status}
                                                </td>
                                                <td>
                                                    <Button variant="success" onClick={(e) => handleSubmit(e, problem._id, problem.CourseID, problem.UserID)}>Grant Access</Button>
                                                </td>
                                            </tr>
                                        )))}

                                    </tbody>
                                </Table>
                            </Container>
                        </Row>
                    </Col>
                </Col>
            </Row>
        </div>

    )
}


export default AdminCourseRequests