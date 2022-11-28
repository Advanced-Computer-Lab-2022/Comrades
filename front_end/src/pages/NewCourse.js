import { useState } from 'react'
import Naavbar from "../components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import "./admin.css"
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import { Link } from 'react-router-dom';



const NewCourse = () => {
    const [title, setTitle] = useState('')
    const [subtitles, setSubtitles] = useState([])
    const [subject, setSubject] = useState('')
    const [instructor, setInstructor] = useState('')
    const [price, setPrice] = useState(Number)
    const [creditHours, setCreditHours] = useState(Number)
    const [discount, setDiscount] = useState(Number)
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [exercises, setExercises] = useState('')
    const [hours, setHours] = useState(Number)
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null)
    const [link, setLink] = useState()
    const [subtitle_description, setSubtitle_description] = useState()

    const newSubtitle = { "Name": name, "Exercises": exercises, "Hours": hours, "Link":link, "Subtitle_description":subtitle_description}

    const handleSubtitles = (x) => {
    
        if (subtitles.length === 0){
            setSubtitles([newSubtitle])
        }
        else(
            setSubtitles(current => [... current, newSubtitle])
        )


    };



    const handleSubmit = async (e) => {
        e.preventDefault()

        const newCourse = { "Title": title, "Subject": subject, "Subtitles": subtitles, "Instructor": instructor, "Price": price, "CreditHours": creditHours, "Discount": discount, "Description": description }
      
        const response = await fetch('/api/courses/createCourse', {
            method: 'POST',
            body: JSON.stringify(newCourse),
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
            setMsg("New  Course is Added Successfully")
            console.log(json)
        }




    };



    return (
        <div className="newCourse">
            <Naavbar />
            <h1>New Course</h1>
            <br></br>
            <Form  onSubmit={handleSubmit} >
                <Form.Group as={Row}  className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Course Title
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control className="input" type="text" placeholder="Title" onChange={(x) => setTitle(x.target.value)} value={title} />
                    </Col>
                </Form.Group>


                <h4>Add Subtitle</h4>


                <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label column sm="2">Name</Form.Label>
                    <Form.Control
                        

                        className="input2"
                        type="Name"
                        placeholder="Name"
                        autoFocus onChange={(x) => setName(x.target.value)} value={name}
                    />
                </Form.Group>
                <Form.Group as={Row}
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label column sm="2">Exercise</Form.Label>
                    <Form.Control  className="input2" type="Exercise" placeholder="Exercise"
                        onChange={(x) => setExercises(x.target.value)} value={exercises}
                    />
                </Form.Group>
                <Form.Group as={Row}
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label column sm="2">Hours</Form.Label>
                    <Form.Control  
                    className="input2" type="number" placeholder="Hours"
                        onChange={(x) => setHours(x.target.value)} value={hours}
                    />
                </Form.Group>
                <Form.Group as={Row}
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label column sm="2">Link</Form.Label>
                    <Form.Control  
                    className="input2" type="text" placeholder="Link"
                        onChange={(x) => setLink(x.target.value)} value={link}
                    />
                </Form.Group>

                <Form.Group as={Row}
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label column sm="2">Subtitle_Description</Form.Label>
                    <Form.Control  
                    className="input2" type="text" placeholder="Subtitle_descritption"
                        onChange={(x) => setSubtitle_description(x.target.value)} value={subtitle_description}
                    />
                </Form.Group>
                { subtitles && subtitles.map((sub=>(
                    <p key={sub.length}> * Name: {sub.Name}  , Exercises: {sub.Exercises} , Hours: {sub.Hours}</p>
                )))}

                <Button variant="primary" onClick={handleSubtitles}  >
                    Save Changes
                </Button>
                <hr></hr>





                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Course Subject
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control  className="input" type="text" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} value={subject} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Course Instructor
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control  className="input" type="text" placeholder="instructor" onChange={(e) => setInstructor(e.target.value)} value={instructor} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Course CreditHours
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control  className="input" type="number" onChange={(e) => setCreditHours(e.target.value)} value={creditHours} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}  className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Course Price
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control  className="input" type="text" placeholder="price" onChange={(e) => setPrice(e.target.value)} value={price} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Course Discount
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control  className="input" type="text" placeholder="discount" onChange={(e) => setDiscount(e.target.value)} value={discount} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Course Discreption
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control  className="desc" as="textarea" rows={3} placeholder="discreption" onChange={(e) => setDescription(e.target.value)} value={description} />
                    </Col>
                </Form.Group>
                <p>{error} {msg}</p>
                <br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="submit" 
                    variant="outline-success" >Add Course</Button>

            </Form >

        </div >
    )
}
export default NewCourse
