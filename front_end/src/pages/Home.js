
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import Naavbar from "../components/Navbar"

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';




const Home = () => {

  return (
    <div className="home">
      <Navbar bg="light" expand="lg">
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
                            
                            <Button  href="/Profile" variant="outline-success" size="sm">View Profile </Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


    



    </div>
  )
}

export default Home