
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import ITSideNav from "./IT/ITSideNav"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Table from 'react-bootstrap/Table';

import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'

import { ProblemModal, ModalOpenButton, ModalContents } from '../components/ProblemModal'


// import { ProblemModal, ModalOpenButton, ModalContents } from '../components/ProblemModal'

const ITReportedProblems = () => {

    const [problems, setProblems] = useState([])
    const { user } = useAuthContext()



    useEffect(() => {
        const fetchProblems = async () => {
            const response = await fetch('/api/problems/getAllProblems')
            const json = await response.json()
            let json2 = [];
            for (let i = 0; i < json.length; i++) {
                if (json[i].UserID == user.username) {
                    json2.push(json[i])
                }
            }
            setProblems(json2)
        }

        if (user !== null) {
            if (user.username !== null)
                fetchProblems()
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
                    <ITSideNav id={1} />
                </Col>
                <Col className="d-flex align-items-center">
                    <Col>
                        <Row>
                            <h3 style={{ margin: "30px 0px 0px 6px" }}>
                                All Problems
                            </h3>
                            <h6 style={{ margin: "6px 0px 0px 6px", opacity: "90%" }}>
                                Click on a <span style={{ fontWeight: "bold", fontStyle: "italic" }}>View Details</span> for more details or to edit status.
                            </h6>
                        </Row>
                        <Row>
                            <Container className="d-flex justify-content-center">
                                <Table striped bordered hover style={{ margin: "40px 0px" }}>
                                    <thead>
                                        <tr>
                                            <th>Course Name</th>
                                            <th>Problem Type</th>
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
                                                    {problem.ProblemType}
                                                </td>
                                                <td>
                                                    {problem.Status}
                                                </td>
                                                <td>
                                                    <ProblemModal>
                                                        <ModalOpenButton>
                                                            <Button variant="dark">Follow Up</Button>
                                                        </ModalOpenButton>
                                                        <ModalContents isAdmin={false} title={"Course: " + problem.CourseID} problemID={problem._id}>
                                                            <h6>
                                                                Problem statement:
                                                            </h6>
                                                            {problem.Problem}
                                                            <hr></hr>
                                                            <p>
                                                                If you feel unsatisfied so far, follow up by reporting again at <span style={{ fontWeight: "bold" }}>My Courses</span> page.
                                                            </p>
                                                        </ModalContents>
                                                    </ProblemModal>
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


export default ITReportedProblems