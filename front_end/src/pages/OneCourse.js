
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


import AdminSideNav from "./Admin/AdminSideNav"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



import { Rating } from '@mui/material';



import { useEffect, useState } from "react"
import { useLogout } from '../hooks/useLogout'



const OneCourse = () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    // console.log(userId);
    const [course, setCourse] = useState([]);
    const [subtitle, setSubtitle] = useState([]);
    const [prev, setPrev] = useState('');
    const [name, setName] = useState([]);
    const [value, setValue] = useState(Number);
    const [value2, setValue2] = useState(Number);
    const [exercise, setExercise] = useState([]);
    const [inst, setInst] = useState()






    const submitCourseRate = async (event) => {
        const response = await fetch("/api/courses/rateCourse/{\"id\": \"" + userId + "\",\"Rating\":\"" + value + "\"}", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()



    }
    const submitInsRate = async (event) => {


        const response = await fetch("/api/users/rateInstructor/{\"name\":\"" + inst + "\",\"Rating\":\"" + value2 + "\"}", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        // console.log("/api/users/rateInstructor/{\"name\":\"" + inst + "\",\"Rating\":\"" + value2 + "\"}")





    }
    const renderSubtitles = (idx, cid) => {

        if (subtitle[idx].id === cid) {
            return (



                <Card style={{ margin: "20px 0px 0px 0px", width: "700px" }} className="course__card" key={course._id} >
                    <Card.Header as="h6">
                        {subtitle[idx].index + 1 + " ◍ "}  {subtitle[idx].arr.Name}
                    </Card.Header>
                    <Card.Body>
                        <Button style={{ marginRight: "10px" }} variant="dark" onClick={() => window.location.href = `os?userId=${course._id}${subtitle[idx].index}`} >View Subtitle</Button>
                    </Card.Body>
                </Card>

                // <>
                //     <Container onClick={() => window.location.href = `/os?userId=${course._id}${subtitle[idx].index}`}>
                //         <Card style={{ marginLeft:"-10px", width: "40rem" }}>
                //             <Card.Body>
                //                 <Card.Text>
                //                     <p>{subtitle[idx].index + 1}. Subtitle:{subtitle[idx].arr.Name}</p>
                //                     <p>{subtitle[idx].arr.Hours} Hours</p>


                //                 </Card.Text>
                //             </Card.Body>
                //         </Card>

                //     </Container>
                //     <br></br>
                // </>
            )
        }
    }


    const { logout } = useLogout()



    const handleClickLogout = () => {
        logout()
    }



    useEffect(() => {
        const getCourses = async () => {
            console.log(userId)
            const response = await fetch("/api/courses/getCourseById/{\"id\": \"" + userId + "\"}")
            const json = await response.json()



            if (response.ok) {

                setCourse(json[0])
                console.log(json)
                setInst(json[0].Instructor)


                let sub = [];
                let index = 0;

                for (let j = 0; j < json[0].Subtitles.length; j++) {
                    sub.push({
                        "index": index,
                        "id": json[0]._id,
                        "arr": json[0].Subtitles[j]
                    })
                    index++;
                }



                setSubtitle(sub);
                console.log(subtitle.index)
                console.log(inst)
                console.log(value2)




                let result = json[0].Preview.substr(16)
                setPrev(result)
            }
        }
        getCourses()

    }, [])




    return (
        <>
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
            <div>
                <Breadcrumb style={{margin:"10px 0px 0px 10px"}}>
                    <Breadcrumb.Item href="/home">
                        My Courses
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{course.Title}</Breadcrumb.Item>
                </Breadcrumb>


                <h2 style={{ margin: "30px 0px 0px 300px" }}>{course.Title}</h2>

                <br></br>
                <hr style={{ margin: "0px 300px" }}></hr>


                <Container style={{ margin: "30px 0px 0px 290px", width: "600px" }}>
                    <Col>
                        <Row>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }} />
                        </Row>

                        <Row sm={4}>
                            &nbsp;&nbsp;&nbsp;<Button onClick={submitCourseRate} variant="dark">
                                Rate Course
                            </Button>
                        </Row>
                        <br></br>
                        <Row>
                            <Rating
                                name="simple-controlled"
                                value={value2}
                                onChange={(event2, newValue) => {
                                    setValue2(newValue);
                                }} />
                        </Row>

                        <Row sm={4}>
                            &nbsp;&nbsp;&nbsp;<Button onClick={submitInsRate} variant="dark">
                                Rate Instructor
                            </Button>
                        </Row>
                    </Col>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h4>
                        Curriculum:
                    </h4>

                    <br></br>

                    {subtitle.map((subtitlee => (
                        renderSubtitles(subtitlee.index, userId)
                    )))}


                </Container>

                <br></br>
                <br></br>
                <br></br>











            </div>
        </>


    )
}


export default OneCourse