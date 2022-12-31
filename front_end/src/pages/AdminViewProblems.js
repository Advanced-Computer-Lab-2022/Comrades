
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import AdminSideNav from "./Admin/AdminSideNav"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Table from 'react-bootstrap/Table';


import { useEffect, useState } from "react"

import "./admin.css"
import { ProblemModal, ModalOpenButton, ModalContents } from '../components/ProblemModal'

const AdminViewProblems = () => {

    const [problems, setProblems] = useState([])


    useEffect(() => {
        const fetchProblems = async () => {
            const response = await fetch('/api/problems/getAllProblems')
            const json = await response.json()
            setProblems(json)
        }
        fetchProblems()
        console.log(problems);
    }, [])


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

                                <Button href="/" variant="outline-light" size="sm">Log Out </Button>
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
                        <Row>
                            <h3 style={{ margin: "30px 0px 0px 6px" }}>
                                All Problems
                            </h3>
                            <h6 style={{ margin: "6px 0px 0px 6px", opacity:"90%" }}>
                                Click on a <span style={{fontWeight:"bold",fontStyle:"italic"}}>View Details</span> for more details or to edit status.
                            </h6>
                        </Row>
                        <Row>
                            <Container className="d-flex justify-content-center">
                                <Table striped bordered hover style={{ margin: "40px 0px" }}>
                                    <thead>
                                        <tr>
                                            <th>Course Name</th>
                                            <th>User Name</th>
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
                                                    {problem.UserID}
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
                                                            <Button variant="dark">View Details</Button>
                                                        </ModalOpenButton>
                                                        <ModalContents isAdmin={true} title={"Course: " + problem.CourseID} problemID = {problem._id}>
                                                            <h6>
                                                                Problem statement:
                                                            </h6>
                                                            {problem.Problem}
                                                            <br></br>
                                                            <br></br>
                                                            <br></br>
                                                            <h6>
                                                                Reported by:
                                                            </h6>
                                                            <p>
                                                                {problem.UserID}
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


export default AdminViewProblems