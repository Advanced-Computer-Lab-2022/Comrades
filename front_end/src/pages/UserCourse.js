import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import Collapse from 'react-bootstrap/Collapse';

import "./Courses.css"

import Naavbar from '../components/Navbar';
import Footer from '../components/Footer/Footer'
import { useEffect, useState } from "react"

// components

const UserCourses = () => {
    const [subtitles, setSubtitles] = useState([])
    const [courses, setCourses] = useState(null)
    const [rate, setRate] = useState(1)


    const [open, setOpen] = useState([]);







   

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/courses/getCourses')
            const json = await response.json()
            let sub = [];
            let index = 0;
            if (response.ok) {
                console.log("ok")
                setCourses(json)
                for (let i = 0; i < json.length; i++) {
                    for (let j = 0; j < json[i].Subtitles.length; j++) {
                        sub.push({
                            "index": index,
                            "id": json[i]._id,
                            "arr": json[i].Subtitles[j]
                        })
                        index++;
                    }

                    let newOpen = open;
                    newOpen.push(false)
                    setOpen(newOpen);
                }
                setSubtitles(sub);
            }
        }
        fetchCourses()
        
    }, [])

    

    return (


        <div>
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
            <br></br>
            <br></br>


            <Container className="allcourses__wrapper">
                <h2 className="text-align-center">Subscribed Courses</h2>
                
                <br></br>
                <hr></hr>
                <br></br>
                <br></br>

                <Row>

                   
                    <Col xs={9}>
                        {courses && courses.map((course => (
                            <Container className="course__card" key={course._id} onClick={() => window.location.href = `/oc?userId=${course._id}`}>
                                <Row>
                                    <Col sm={3}>
                                        <img style={{ width: "160px" }} src="https://img.youtube.com/vi/rfscVS0vtbw/0.jpg"></img>
                                    </Col>
                                    <Col sm={7}>
                                        <Row>
                                            <h6>{course.Title}</h6>
                                        </Row>
                                        <Row>
                                            <p style={{ margin: "0px" }}>{course.TotalHours} Hours</p>
                                        </Row>
                                        <Row>
                                            <p style={{ fontWeight: "700" }}>{course.Rating} 🌟</p>
                                        </Row>
                                        {/* <Row>
                                            <Button onClick={() => window.location.href = `/oc?userId=${course._id}`} variant="dark" style={{ width: "140px", border: "0px", padding: "4px", marginRight: "10px" }}>More Details</Button>
                                        </Row> */}
                                    </Col>
                                    
                                </Row>
                                <br></br>
                                <hr></hr>
                                <br></br>
                            </Container>
                           
                        )))}

                    </Col>
                </Row>
            </Container>

            <Footer />





        </div>



    )
}

export default UserCourses