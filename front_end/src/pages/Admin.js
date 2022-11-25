import { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Naavbar from '../components/Navbar';

import "./admin.css"

const Admin = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('ct')
    const [error, setError] = useState(null)
    const [msg , setMsg] = useState(null) 
    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = { "Username": name,"Password": password,"UserType": type }

        const response = await fetch('/api/users/createUserByAdmin', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        
        if (!response.ok) {
            setError("Please Fill Empty Cells")
        }
        if (response.ok) {
            setError(null)
            setName('')
            setPassword('')
            setType('ct')
            setMsg("New "+ json.UserType +" is Added Successfully")
            console.log('new user added:', json)
            

        }

    }


    return (

        <><Naavbar/>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Username
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control className="input" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name}/>
                        
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control className="input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Select User Type</Form.Label>
                    <Col sm="10">
                        <Form.Select className="input" onChange={(e) => setType(e.target.value)} value={type}>
                            <option value="ct">Corporate Trainee</option>
                            <option value="admin">Admin</option>
                            <option value="instructor">Instructor</option>
                        </Form.Select>
                    </Col>
                    <p>{error} {msg}</p>
                    

                </Form.Group>
                <br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="submit"  variant="outline-success" onClick={()=>{console.log({user})}}>Add User</Button>
                
            </Form></>

    )
}


export default Admin