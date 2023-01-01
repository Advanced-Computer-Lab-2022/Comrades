import Naavbar from "../../components/Navbar.js"
import InstSideNav from "./InstSideNav.js"
import { useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from "react-bootstrap/NavDropdown";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { useLogout } from '../../hooks/useLogout'

const Instructor = () => {
  const { user } = useAuthContext()

  const [instructor, setInstructor] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {

    const fetchInstructor = async () => {
      const response = await fetch("/api/users/getInstructorByID/{\"query\": \"" + user.username + "\"}");
      const json = await response.json();
      if (response.ok) {
        setInstructor(json);
        console.log(json);
      }
    };

    if (user !== null) {
      if (user.username !== null)
        fetchInstructor();
    }





  }, [user, instructor]);





  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/users/changePasswordNoToken/{\"Token\": \"" + user.username + "\",\"Password\": \"" + password + "\"}", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (response.ok) {
      console.log(json)
    }
  }


  const handleSubmit1 = async (e) => {
    e.preventDefault();
    handleClose1();
    const response = await fetch(
      `/api/users/changeEmail/{"Email":"${email}","User":"${user.username}"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      console.log(json);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    handleClose2();

    const response = await fetch(
      `/api/users/changeBio/{"Bio":"${bio}","User":"${user.username}"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      console.log(json);
    }
  };


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [email, setEmail] = useState("");
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);


  const [bio, setBio] = useState("");
  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);


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
          <InstSideNav />
        </Col>
        <Col className="d-flex align-items-left">
          <br></br>
          <Row>
            <Container>
              <br></br>
              <h2>
                {"👋 " + instructor.Username + ", Enjoy your stay!"}
              </h2>
              <br></br>
              <h5>
                {"Wallet: " + instructor.Wallet}
              </h5>
              <p>This is 50% from the sales of the current month, You can cash out at the end of the month.</p>
              <br></br>
              <h5>
                Email: {instructor.Email} <span onClick={handleShow1}> ✎ </span>
              </h5>
              <br></br>
              <h5>
                Bio: {instructor.Biography} <span onClick={handleShow2}> ✎ </span>
              </h5>
              <br></br>
              <Button variant="dark" onClick={handleShow}>
                Change Password
              </Button>

            </Container>
          </Row>
        </Col>
      </Row>


      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Change Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label>
              Enter New Email
            </Form.Label>
            <Form.Control style={{ marginLeft: "50px" }}
              className="input"
              type="text"
              placeholder="New Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit1}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Change Bio</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label>
              Enter New Bio
            </Form.Label>
            <Form.Control style={{ marginLeft: "50px" }}
              className="input"
              type="text"
              placeholder="New Bio"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit2}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container>

              <Form.Group controlId="formPlaintextEmail">
                <Form.Label>
                  Enter New Password
                </Form.Label>
                <br></br>
                <Form.Control className="input" type="text" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </Form.Group>
            </Container>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>





    </div>
  )
}

export default Instructor