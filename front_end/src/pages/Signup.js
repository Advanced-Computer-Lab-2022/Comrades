import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { useLogin } from "../hooks/useLogin"


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('male')
  const { signup, error, isLoading } = useSignup()
  const { login, error1, isLoading1 } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(username.toLowerCase(), email, password, firstName, lastName, gender)
    await login(username.toLowerCase(), password)

  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div style={{ backgroundColor: "#212529" }}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div class="centered__form__wrapper">
        <h3 style={{ paddingLeft: "80px" }}>
          Signup Page
        </h3>
        <br></br>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{fontWeight:"bold"}}>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} value={username} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{fontWeight:"bold"}}>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={email} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{fontWeight:"bold"}}>Password</Form.Label>
            <p>
              Use Atleast 1 Uppercase letter, 1 number & 1 special character, Example: Xxxx1234^
            </p>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{fontWeight:"bold"}}>First Name</Form.Label>
            <Form.Control type="firstName" placeholder="Enter your first name" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{fontWeight:"bold"}}>Last Name</Form.Label>
            <Form.Control type="lastName" placeholder="Enter your last name" onChange={(e) => setLastName(e.target.value)} value={lastName} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{fontWeight:"bold"}}>Gender</Form.Label>
            <Form.Select aria-label="Default select example" onChange={(e) => setGender(e.target.value)}>
              <option>Choose Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>
          </Form.Group>

          <Button style={{ paddingLeft: "0px" }} variant="link" onClick={handleShow}>
            View Company Policy
          </Button>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Accept Company Policy?"
            required="true"
          />
          <br></br>
          <br></br>
          <Button disabled={isLoading} variant="dark" type="submit">
            Signup
          </Button>
          <Button href="/" variant="danger" style={{ marginLeft: "10px", borderRadius: "0px" }}>
            Cancel
          </Button>
          {error && <div className="error">{error}</div>}
        </Form>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Company Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
    // <form className="signup" onSubmit={handleSubmit}>
    //   <h3>Sign Up</h3>

    //   <label>Email address:</label>
    //   <input
    //     type="email"
    //     onChange={(e) => setEmail(e.target.value)}
    //     value={email}
    //   />
    //   <label>Password:</label>
    //   <input
    //     type="password"
    //     onChange={(e) => setPassword(e.target.value)}
    //     value={password}
    //   />

    //   <button disabled={isLoading}>Sign up</button>
    //   {error && <div>{error}</div>}
    // </form>
  )
}

export default Signup