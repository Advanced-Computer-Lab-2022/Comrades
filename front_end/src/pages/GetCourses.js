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

const GetCourses = () => {
    const [subtitles, setSubtitles] = useState([])
    const [courses, setCourses] = useState(null)
    const [country, setCountry] = useState()
    const [rate, setRate] = useState(1)
    const [code, setCode] = useState("USD")

    const [countries, setCountries] = useState([]);

    const [open, setOpen] = useState([]);

    const [price, setPrice] = useState('');
    const [subject, setSubject] = useState('');
    const [rating, setRating] = useState(Number);

    const [show, setShow] = useState([]);




    const handleSubmit = async (e) => {
        e.preventDefault()
        const fetchCountry = async () => {
            const response = await fetch('/api/courses/getCurrency/' + country)
            const json = await response.json()

            if (response.ok) {
                setCode(json.code);
                setRate(json.rate);
            }
        }
        fetchCountry()
        console.log("Country: " + country)
        console.log(subtitles);
        // console.log("Rate: " + rate)
    }

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
        const fetchCountriesList = async () => {
            const response = await fetch('/api/courses/getCountries')
            const json = await response.json();
            if (response.ok) {
                if (countries.length < 1) {
                    for (let i = 0; i < 243; i++) {
                        countries.push(json[i]);
                    }
                }
            }
        }
        fetchCountriesList()
    }, [])

    const getByPrice = async (x) => {

        x.preventDefault()
        const response = await fetch('/api/courses/filterCoursesByPrice/' + price)
        const json = await response.json()

        if (response.ok) {
            setCourses(json)
            console.log(json)

        }
    }

    const getBySubjectandRating = async (z) => {

        z.preventDefault()
        const response = await fetch("/api/courses/filterCoursesBySubjectAndRating/{\"subject\": \"" + subject + "\",\"rating\": \"" + rating + "\"}")
        const json = await response.json()

        if (response.ok) {
            setCourses(json)
            console.log(json)


        }
    }

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
                <h2 className="text-align-center">All Of Our Courses</h2>
                <p>
                    See why millions of people turn to <span style={{ fontWeight: "500" }}>Comrades</span> real-world experts to learn.
                    Learn at your own pace with hands-on exercises and quizzes. Our courses are frequently updated so you’ll always be working from the latest information.
                    This is the training you’ll need to become a professional.
                </p>
                <br></br>
                <hr></hr>
                <br></br>
                <br></br>

                <Row>

                    <Col xs={3} className="filters__wrapper">
                        <Form>
                            <Form.Group className="mb-3" controlId="formPlaintextEmail">

                                <Row sm="10">
                                    <h4 style={{ textAlign: "left", margin: "0px" }}>Price</h4>
                                    <p style={{ textAlign: "left" }}>
                                        (Less than or equal)
                                    </p>
                                    <Form.Control style={{ marginLeft: "10px", width: "120px" }} className="input" type="text" placeholder="Price" onChange={(x) => setPrice(x.target.value)} value={price} />
                                    <Button style={{ marginLeft: "10px", width: '100px' }} variant="dark" placeholder='Price' onClick={getByPrice}>Filter</Button>
                                </Row>
                            </Form.Group>
                            <hr style={{ margin: "40px 0px" }}></hr>
                            <Form.Group className="mb-3" controlId="formPlaintextEmail">

                                <Row sm="10">
                                    <h4 style={{ textAlign: "left", margin: "0px" }}>Subject / Rating</h4>
                                    <p style={{ textAlign: "left" }}>
                                        (Less than or equal)
                                    </p>
                                    <Form.Control style={{ marginLeft: "10px", width: "120px", marginRight: "50px", marginBottom: "5px" }} className="input" type="text" placeholder="Subject" onChange={(z) => setSubject(z.target.value)} value={subject} />
                                    <Form.Control style={{ marginLeft: "10px", width: '120px', marginRight: "70px", marginBottom: "5px" }} className="input" type="text" placeholder="Rating" onChange={(z) => setRating(z.target.value)} value={rating} />
                                    <Button style={{ marginLeft: "10px", width: '100px' }} variant="dark" placeholder='Subject' onClick={getBySubjectandRating}>Filter</Button>
                                </Row>
                            </Form.Group>
                        </Form>
                        <hr style={{ margin: "40px 0px" }}></hr>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mb-3" style={{ padding: "0px" }}>
                                <h4 style={{ textAlign: "left", margin: "0px" }}>Select Country</h4>

                                <Form.Select style={{ margin: "10px", width: "200px", marginBottom: "0px" }} className="input" onChange={(e) => setCountry(e.target.value)} value={country}>

                                    {countries.map(d => (
                                        <>
                                            <option value={d}>
                                                {d}
                                            </option>
                                        </>
                                    )
                                    )}
                                </Form.Select>
                                <Button style={{ width: "140px", margin: "5px 0px 0px 10px" }} type="submit" variant="dark" onClick={() => { console.log({ country }) }}>Select Country</Button>

                            </Form.Group>
                        </Form>


                    </Col>
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
                                    <Col sm={2}>
                                        <p>
                                            {code}   {course.DiscountedPrice * rate} ({course.Discount}%)
                                        </p>
                                    </Col>
                                </Row>
                                <br></br>
                                <hr></hr>
                                <br></br>
                            </Container>
                            // <Card key={course._id} style={{ margin: 45 }}>




                            //     <Card.Header>{course.Title}</Card.Header>
                            //     <Card.Body>
                            //         {/* <Card.Title>Special title treatment</Card.Title> */}
                            //         <Card.Text>
                            //             Original Price: {code}   {course.Price * rate}
                            //             <br></br>
                            //             Discounted Price: {code}   {course.DiscountedPrice * rate} ({course.Discount}%)
                            //             <br></br>
                            //             Total Hours: {course.TotalHours}
                            //             <br></br>
                            //             Rating: {course.Rating} ☆


                            //             {subtitles.map((subtitle => (
                            //                 renderSubtitles(subtitle.index, course._id)
                            //             )))}


                            //         </Card.Text>
                            //         <Button onClick={() => window.location.href = `/oc?userId=${course._id}`} size="sm">
                            //             view Course
                            //         </Button>

                            //     </Card.Body>
                            // </Card>

                        )))}

                    </Col>
                </Row>
            </Container>

            <Footer />





        </div>



    )
}

export default GetCourses