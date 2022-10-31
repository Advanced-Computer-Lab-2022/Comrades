import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import { useState } from 'react'


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Navbar.css"
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import Image from 'react-bootstrap/Image'




function Naavbar  (prop)  {
    const [search, setSearch] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const fetchSearch = async () => {
            const response = await fetch('/api/courses/Search/' + search)
            const json = await response.json()

            if (response.ok) {
                console.log(json)
            }
        }
        fetchSearch()
    }
    return (
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
                        <Form className="d-flex" onSubmit={handleSubmit}>
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

    );
}

export default Naavbar