import Naavbar from '../components/Navbar';
import { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const AddDiscount = () => {

    const params = new URLSearchParams(window.location.search);
    const courseID = params.get('courseID');
    const [discount, setDiscount] = useState(0);
    const [discountDuration, setDiscountDuration] = useState(0);


    const handleSubmit = async (e) => {
        e.preventDefault()
        
            
            
            const response = await fetch("/api/courses/changeDiscount/{\"id\": \""+courseID+"\",\"Discount\": \""+discount+"\",\"DiscountDuration\": \""+ discountDuration +"\"}", {
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


    
    
    return (



    <><Naavbar />
    <Form>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Enter Discount Value
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control className="input" type="number" onChange={(e) => setDiscount(e.target.value)} value={discount} />

                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Enter Duration
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control className="input" type="number"  onChange={(e) => setDiscountDuration(e.target.value)} value={discountDuration} />

                    </Col>
                </Form.Group>
                <Col sm="10">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type="submit" variant="outline-success" onClick={handleSubmit}>Save Discount</Button>


                    </Col>


        </Form></>
           
    )
}


export default AddDiscount;