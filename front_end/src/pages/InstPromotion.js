
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';



import InstSideNav from "./Instructor/InstSideNav"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Table from 'react-bootstrap/Table';

import Alert from 'react-bootstrap/Alert';


import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'

import { ProblemModal, ModalOpenButton, ModalContents } from '../components/ProblemModal'


// import { ProblemModal, ModalOpenButton, ModalContents } from '../components/ProblemModal'


import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';




const InstPromotion = () => {

    const { user } = useAuthContext()

    const [myCourses, setMyCourses] = useState([]);

    const [course, setCourse] = useState("");




    useEffect(() => {

        const fetchCourses = async () => {
            const response = await fetch("/api/courses/getCoursesInstructor/" + user.username);
            const json = await response.json();
            if (response.ok) {
                setMyCourses(json);
                console.log("Done");
            }
        };



        if (user !== null) {
            if (user.username !== null)
                fetchCourses()
        }

    }, [user])




    // #############################################

    const [value, setValue] = useState(dayjs('2023-01-01'));
    const [value2, setValue2] = useState(dayjs('2023-01-01'));
    const [percentage, setPercentage] = useState(0);

    percentage
    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const handleChange2 = (newValue) => {
        setValue2(newValue);
    };



    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    function AlertDismissibleExample() {
        if (show2) {
            return (
                <Alert variant="success" onClose={() => setShow2(false)} dismissible>
                    <Alert.Heading>Promotion have been applied</Alert.Heading>
                    <p>For: {value2.diff(value, 'day')} Days</p>
                </Alert>
            );
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let duration = value2.diff(value, 'day');
        const response = await fetch("/api/courses/changeDiscount/{\"id\": \"" + course + "\",\"Discount\": \"" + percentage + "\",\"DiscountDuration\": \"" + duration + "\"}", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        handleShow2();




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
                    <InstSideNav id={1} />
                </Col>
                <Col className="d-flex align-items-center">
                    <Col>
                        <Row>
                            <AlertDismissibleExample />
                            <h3 style={{ margin: "30px 0px 0px 6px" }}>
                                Define Promotion
                            </h3>
                            <h6 style={{ margin: "6px 0px 0px 6px", opacity: "90%" }}>
                                Note: It will overwrite any existing promotion for this course!
                            </h6>
                        </Row>
                        <br></br>
                        <br></br>
                        <Row>
                            <Container>
                                <Form.Group as={Row} className="mb-3" style={{ padding: "0px" }}>
                                    <h6 style={{ textAlign: "left", margin: "0px" }}>Select Course</h6>

                                    <Form.Select style={{ margin: "10px", width: "200px", marginBottom: "0px" }} className="input" onChange={(e) => setCourse(e.target.value)} value={course}>

                                        <option value={""}>
                                            Select Course
                                        </option>
                                        {myCourses.map(d => (
                                            <>
                                                <option value={d.Title}>
                                                    {d.Title}
                                                </option>
                                            </>
                                        )
                                        )}
                                    </Form.Select>
                                </Form.Group>
                                <br></br>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        label="Start date"
                                        inputFormat="MM/DD/YYYY"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <DesktopDatePicker
                                        label="End date"
                                        inputFormat="MM/DD/YYYY"
                                        value={value2}
                                        onChange={handleChange2}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <br></br>
                                <br></br>
                                <Form.Group
                                    controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Percentage</Form.Label>
                                    <Form.Control
                                        className="input2" type="text" placeholder="Percentage"
                                        onChange={(x) => setPercentage(x.target.value)} value={percentage}
                                    />
                                </Form.Group>
                                <br></br>
                                <Button type="submit" variant="dark" onClick={(e) => { handleSubmit(e) }}>Submit</Button>

                            </Container>
                        </Row>
                    </Col>
                </Col>
            </Row>

        </div>

    )
}


export default InstPromotion