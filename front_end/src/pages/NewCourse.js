import { useState } from 'react'
import Naavbar from "../components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import "./admin.css"
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import { Link } from 'react-router-dom';
import InstSideNav from "./Instructor/InstSideNav"
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'


const NewCourse = () => {
    const [title, setTitle] = useState('')
    const [subtitles, setSubtitles] = useState([])
    const [subject, setSubject] = useState('')
    const [instructor, setInstructor] = useState('')
    const [price, setPrice] = useState(Number)
    const [creditHours, setCreditHours] = useState(Number)
    const [discount, setDiscount] = useState(Number)
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [exercises, setExercises] = useState([])
    const [hours, setHours] = useState(Number)
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null)
    const [link, setLink] = useState()
    const [subtitle_description, setSubtitle_description] = useState()
    const [preview, setPreview] = useState()
    const [Question, setQuestion] = useState()
    const [Answer1, setAnswer1] = useState()
    const [Answer2, setAnswer2] = useState()
    const [Answer3, setAnswer3] = useState()
    const [Answer4, setAnswer4] = useState()
    const [CorrectAnswer, setCorrectAnswer] = useState()



    const newSubtitle = { "Name": name, "Exercises": exercises, "Hours": hours, "Link": link, "Subtitle_description": subtitle_description }

    const handleSubtitles = (x) => {

        if (subtitles.length === 0) {
            setSubtitles([newSubtitle])
        }
        else (
            setSubtitles(current => [...current, newSubtitle])
        )
        setExercises([]);

    };



    const handleSubmit = async (e) => {
        e.preventDefault()

        const newCourse = { "Title": title, "Subject": subject, "Subtitles": subtitles, "Instructor": instructor, "Price": price, "CreditHours": creditHours, "Discount": discount, "Description": description, "Preview": preview }
        const response = await fetch('/api/courses/createCourse', {
            method: 'POST',
            body: JSON.stringify(newCourse),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError("Please Fill Empty Cells")
        }
        if (response.ok) {
            setError(null)
            setMsg("New  Course is Added Successfully")
            console.log(json)
        }




    };
    const Exercise = { "Question": Question, "Answer1": Answer1, "Answer2": Answer2, "Answer3": Answer3, "Answer4": Answer4, "CorrectAnswer": CorrectAnswer }


    const handlexercise = async (x) => {
        if (exercises.length === 0) {
            setExercises([Exercise])
        }
        else (
            setExercises(current => [...current, Exercise])
        )
    }


    const { logout } = useLogout()

const handleClickLogout = () => {
    logout()
}




    return (
        <div className="newCourse">
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
                    <InstSideNav id={0} />
                </Col>
                <Col className="d-flex align-items-center">
                    <Container className="d-flex justify-content-center">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <h2 style={{ paddingLeft: "0px", marginBottom: "20px" }}>New Course</h2>
                                <Form.Label style={{ paddingLeft: "0px" }}>
                                    Course Title
                                </Form.Label>
                                <Form.Control className="input" type="text" placeholder="Title" onChange={(x) => setTitle(x.target.value)} value={title} />
                            </Form.Group>
                            <br></br>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label style={{ paddingLeft: "0px" }}>
                                    Preview
                                </Form.Label>
                                <Form.Control className="input" type="text" placeholder="Preview" onChange={(x) => setPreview(x.target.value)} value={preview} />
                            </Form.Group>
                            <br></br>
                            <hr></hr>



                            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                                <h3 style={{ paddingLeft: "0px", marginBottom: "20px" }}>Add Subtitle</h3>

                                <Form.Label style={{ paddingLeft: "0px" }}>Name</Form.Label>
                                <Form.Control
                                    className="input2"
                                    type="Name"
                                    placeholder="Name"
                                    autoFocus onChange={(x) => setName(x.target.value)} value={name}
                                />
                            </Form.Group>
                            <br></br>
                            <Form.Group as={Row}
                                controlId="exampleForm.ControlTextarea1">
                                <Form.Label style={{ paddingLeft: "0px" }}>Hours</Form.Label>
                                <Form.Control
                                    className="input2" type="text" placeholder="Hours"
                                    onChange={(x) => setHours(x.target.value)} value={hours}
                                />
                            </Form.Group>
                            <br></br>
                            <Form.Group as={Row} controlId="exampleForm.ControlTextarea1" >
                                <Form.Label style={{ paddingLeft: "0px" }}>Link</Form.Label>
                                <Form.Control
                                    className="input2" type="text" placeholder="Link"
                                    onChange={(x) => setLink(x.target.value)} value={link}
                                />
                            </Form.Group>
                            <br></br>
                            <Form.Group as={Row}
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label style={{ paddingLeft: "0px" }}>Subtitle Description</Form.Label>
                                <Form.Control
                                    className="input2" type="text" placeholder="Subtitle descritption"
                                    onChange={(x) => setSubtitle_description(x.target.value)} value={subtitle_description}
                                />
                            </Form.Group>
                            <hr></hr>
                            <Form.Group as={Row}
                                
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <h3 style={{ paddingLeft: "0px", marginBottom: "20px" }}>Add Exercise</h3>

                                <Form.Label style={{ paddingLeft: "0px" }}>Question</Form.Label>
                                <Form.Control
                                    className="input2" type="text" placeholder="Question"
                                    onChange={(x) => setQuestion(x.target.value)} value={Question}
                                />
                            </Form.Group>
                            <br></br>
                            <Form.Group as={Row}
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label style={{ paddingLeft: "0px" }}>Answer1</Form.Label>
                                <Form.Control
                                    className="input2" type="text" placeholder="First Answer"
                                    onChange={(x) => setAnswer1(x.target.value)} value={Answer1}
                                />
                            </Form.Group>
                            <br></br>
                            <Form.Group as={Row}
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label style={{ paddingLeft: "0px" }}>Answer2</Form.Label>
                                <Form.Control
                                    className="input2" type="text" placeholder="Second Answer"
                                    onChange={(x) => setAnswer2(x.target.value)} value={Answer2}
                                />
                            </Form.Group>
                            <br></br>
                            <Form.Group as={Row}
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label style={{ paddingLeft: "0px" }}>Answer3</Form.Label>
                                <Form.Control
                                    className="input2" type="text" placeholder="Third Answer"
                                    onChange={(x) => setAnswer3(x.target.value)} value={Answer3}
                                />
                            </Form.Group>
                            <br></br>
                            <Form.Group as={Row}
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label style={{ paddingLeft: "0px" }}>Answer4</Form.Label>
                                <Form.Control
                                    className="input2" type="text" placeholder="Fourth Answer"
                                    onChange={(x) => setAnswer4(x.target.value)} value={Answer4}
                                />
                            </Form.Group>
                            <br></br>
                            <Form.Group as={Row}
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label style={{ paddingLeft: "0px" }}>Correct Answer</Form.Label>
                                <Form.Control
                                    className="input2" type="text" placeholder="Correct Answer"
                                    onChange={(x) => setCorrectAnswer(x.target.value)} value={CorrectAnswer}
                                />
                            </Form.Group>
                            <br></br>

                            <Button style={{ marginLeft: "-10px" }} variant="dark" onClick={handlexercise}  >
                                Save Exercise
                            </Button>
                            {exercises && exercises.map((sub => (
                                <p key={sub.length}> * Question: {sub.Question}</p>
                            )))}

                            <hr></hr>

                            <Button style={{ marginLeft: "-10px" }} variant="dark" onClick={handleSubtitles}  >
                                Save Changes
                            </Button>

                            {subtitles && subtitles.map((sub => (
                                <p key={sub.length}> * Name: {sub.Name}</p>
                            )))}
                            <hr></hr>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label style={{ paddingLeft: "0px" }}>
                                    Course Subject
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control className="input" type="text" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} value={subject} />
                                </Col>
                            </Form.Group>
                            <br></br>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label style={{ paddingLeft: "0px" }}>
                                    Course Instructor
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control className="input" type="text" placeholder="instructor" onChange={(e) => setInstructor(e.target.value)} value={instructor} />
                                </Col>
                            </Form.Group>
                            <br></br>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label style={{ paddingLeft: "0px" }}>
                                    Course CreditHours
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control className="input" type="text" onChange={(e) => setCreditHours(e.target.value)} value={creditHours} />
                                </Col>
                            </Form.Group>
                            <br></br>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label style={{ paddingLeft: "0px" }}>
                                    Course Price
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control className="input" type="text" placeholder="price" onChange={(e) => setPrice(e.target.value)} value={price} />
                                </Col>
                            </Form.Group>
                            <br></br>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label style={{ paddingLeft: "0px" }}>
                                    Course Discount
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control className="input" type="text" placeholder="discount" onChange={(e) => setDiscount(e.target.value)} value={discount} />
                                </Col>
                            </Form.Group>
                            <br></br>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label style={{ paddingLeft: "0px" }}>
                                    Course Description
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control className="desc" as="textarea" rows={3} placeholder="discreption" onChange={(e) => setDescription(e.target.value)} value={description} />
                                </Col>
                            </Form.Group>
                            <br></br>

                            <p>{error} {msg}</p>
                            <br></br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button style={{ marginLeft: "-10px" }} type="submit"
                                variant="dark" >Add Course</Button>
                                                            <br></br>
                                                            <br></br>


                        </Form>

                    </Container>
                </Col>
            </Row>

























        </div >
    )
}
export default NewCourse
