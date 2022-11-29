


import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';

import Naavbar from '../components/Navbar';
import { useEffect, useState } from "react"

const GetCoursesByInstructor = (prop) => {
    const [myCourses, setMyCourses] = useState(null)
    const [search, setSearch] = useState('')
    const [price , setPrice] = useState('')
    const [subject , setSubject] = useState('')



   


    const handleSubmit2 = async (e) => {
        e.preventDefault()
        const fetchSearch = async () => {
            const response = await fetch('/api/courses/searchInstructor/' + search)
            const json = await response.json()

            if (response.ok) {
                setMyCourses(json)
            }
        }
        fetchSearch()
    }
    useEffect(() => {

        const fetchCourses = async () => {
            const response = await fetch('/api/courses/getCoursesInstructor')
            const json = await response.json()
            if (response.ok) {

                setMyCourses(json)
                console.log("Done")
            }


        }

        fetchCourses()
    }, [])

    const getByPrice = async(x) =>{
        
        x.preventDefault()
        const response =  await fetch('/api/courses/filterCoursesByPriceInstructor/' + price )
        const json =  await response.json()

        if (response.ok) {
            setMyCourses(json)
            console.log(json)

        }

    }

    const getBySubject = async(z) =>{
        
        z.preventDefault()
        const response =  await fetch('/api/courses/filterCoursesBySubjectInstructor/' + subject )
        const json =  await response.json()

        if (response.ok) {
            setMyCourses(json)
            console.log(json)

        }
    }






    return (

        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Comrades{prop.name}</Navbar.Brand>
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
            <h1>&nbsp; &nbsp;Welcome Dr. ahmedInstructor </h1>
            <br></br>
            <br></br>

            
            <Form>
                <Form.Group  className="mb-3" controlId="formPlaintextEmail">
                    
                    <Row sm="10">
                        <Button   style={{ width: '10rem'}} variant="outline-success" placeholder='Price' onClick={getByPrice}>Filter By Price</Button>
                        <Form.Control className="input" type="text" placeholder="Price" onChange={(x) => setPrice(x.target.value)} value={price} />
                    </Row>
                </Form.Group>
          
                <Form.Group  className="mb-3" controlId="formPlaintextEmail">
                    
                    <Row sm="10">
                        <Button   style={{ width: '10rem'}} variant="outline-success" placeholder='Subject' onClick={getBySubject}>Filter By Subject</Button>
                        <Form.Control className="input" type="text" placeholder="Subject" onChange={(z) => setSubject(z.target.value)} value={subject} />
                    </Row>
                </Form.Group>
            </Form>


            

            {myCourses && myCourses.map((mycourse => (
                <><br></br><Card key={mycourse._id} style={{ width: '40rem'}}>
                    <Card.Header>{mycourse.Title}</Card.Header>
                    <Card.Body>
                        
                        <Card.Text>
                            Instructor Name: {mycourse.Instructor}
                            <br></br>
                            Course Subject: {mycourse.Subject}
                            <br></br>
                            Course Price: {mycourse.Price}

                        </Card.Text>
                        <Button variant="primary">View Details</Button>
                    </Card.Body>
                </Card></>
                
                



            )))}


        </div>



    )
}

export default GetCoursesByInstructor