import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';



const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(username.toLowerCase(), password)

  }



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
    </div>
  );
}

export default Login