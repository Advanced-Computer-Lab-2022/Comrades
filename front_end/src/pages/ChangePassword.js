import Naavbar from '../components/Navbar';
import { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const ChangePassword = () => {

    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        
            
            
            const response = await fetch("/api/users/changePassword/{\"Token\": \""+token+"\",\"Password\": \""+ password +"\"}", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
            const json =  await response.json()
    
            if (response.ok) {
                console.log(json)
    
            }
    
  

    }

    const handleSubmit2 = async(e) =>{
        e.preventDefault()
        const response = await fetch("/api/users/recieveEmailToChangePassword", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            console.log("ok")
            
           
        }
    }


    
    
    return (



    <><Naavbar />

    <br></br>
    <Button type="submit" variant="outline-success" onClick={handleSubmit2}>Recive Token</Button>


    <br></br>

    <Form>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Enter Token
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control className="input" type="text" placeholder="Token" onChange={(e) => setToken(e.target.value)} value={token} />

                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Enter New Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control className="input" type="text" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} value={password} />

                    </Col>
                </Form.Group>
                <Col sm="10">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type="submit" variant="outline-success" onClick={handleSubmit}>Save Password</Button>


                    </Col>


        </Form></>
           
    )
}


export default ChangePassword;