
import AdminSideNav from "./AdminSideNav.js"

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



const Admin = () => {


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

                <Button href="/Profile" variant="outline-light" size="sm">Log Out </Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AdminSideNav />
    </div>
  )
}

export default Admin