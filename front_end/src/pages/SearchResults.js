import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import Naavbar from '../components/Navbar';
import { useEffect, useState } from "react"

// components

const SearchResults = (prop) => {
    const [courses, setCourses] = useState(null)
    const [country, setCountry] = useState('USA')
    const [rate, setRate] = useState(1)
    const [search, setSearch] = useState('')


    const handleSubmit2 = async (e) => {
        e.preventDefault()
        const fetchSearch = async () => {
            const response = await fetch('/api/courses/Search/' + search)
            const json = await response.json()

            if (response.ok) {
                setCourses(json)
            }
        }
        fetchSearch()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const fetchCountry = async () => {
            const response = await fetch('/api/courses/getCurrency/' + country)
            const json = await response.json()

            if (response.ok) {
                setRate(json)
            }
        }
        fetchCountry()
        console.log("Country: " + country)
        // console.log("Rate: " + rate)
    }

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/courses/getCourses')
            const json = await response.json()

            if (response.ok) {
                console.log("ok")
                setCourses(json)
            }
        }
        fetchCourses()
    }, [])

    return (

        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">Comrades{prop.name}</Navbar.Brand>
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
                            <Form className="d-flex" onSubmit={handleSubmit2}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={(e) => setSearch(e.target.value)} value={search}
                                />
                                <Button type="submit" variant="outline-success">Search</Button>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br></br>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Select Country:</Form.Label>
                    <Form.Select className="input" onChange={(e) => setCountry(e.target.value)} value={country}>
                        <option value="USA">USA</option>
                        <option value="Germany">Germany</option>
                        <option value="Italy">Italy</option>
                        <option value="France">France</option>
                        <option value="Spain">Spain</option>
                        <option value="Egypt">Egypt</option>
                        <option value="England">England</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="Russia">Russia</option>
                        <option value="Italy">Italy</option>
                    </Form.Select>
                </Form.Group>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="submit" variant="outline-success" onClick={() => { console.log({ country }) }}>Select Country</Button>
            </Form>
            <br></br>

            <h2>&nbsp; &nbsp;Availale Courses:</h2>
            {courses && courses.map((course => (

                <Card key={course._id} style={{ margin: 45 }}>
                    <Card.Header>{course.Title}</Card.Header>
                    <Card.Body>
                        {/* <Card.Title>Special title treatment</Card.Title> */}
                        <Card.Text>
                            Price: {course.Price * rate * (1 - course.Discount / 100)} ({course.Discount}%)
                            <br></br>
                            Total Hours: {course.TotalHours}
                            <br></br>
                            Rating: {course.Rating} ☆


                        </Card.Text>
                        <Button variant="primary">View Details</Button>
                    </Card.Body>
                </Card>



            )))}


        </div>



    )
}

export default SearchResults