import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';



const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(username.toLowerCase(), password)

  }

  const handleSubmit2 = async (e) => {
    e.preventDefault()
    handleClose()
    const response = await fetch(`/api/users/recieveEmailToChangePassword/{"Email": "${email}"}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      console.log("ok")


    }
  }



  const [email, setEmail] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  return (
    <div style={{ backgroundColor: "#212529", height: "100vh" }}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div class="centered__form__wrapper">
        <h3 style={{ paddingLeft: "80px" }}>
          Login Page
        </h3>
        <br></br>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} value={username} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
          </Form.Group>
          <Button onClick={handleShow} variant="link" style={{ marginLeft: "-10px" }}>
            Forgot your password?
          </Button>
          <br></br>
          <br></br>
          <Button disabled={isLoading} variant="dark" type="submit">
            Login
          </Button>
          <Button href="/" variant="danger" style={{ marginLeft: "10px", borderRadius: "0px" }}>
            Cancel
          </Button>
          {error && <div className="error">{error}</div>}
        </Form>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            Enter Email
          </Form.Label>
          <Form.Control style={{ marginLeft: "0px" }}
            className="input"
            type="text"
            placeholder="New Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit2}>
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Login