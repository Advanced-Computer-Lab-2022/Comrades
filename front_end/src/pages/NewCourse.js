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
    const [exercises, setExercises] = useState([])
    const [hours, setHours] = useState(Number)
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null)
    const [link, setLink] = useState()
    const [subtitle_description, setSubtitle_description] = useState()
    const [preview, setPreview] = useState()
    const [Question, setQuestion] = useState()
    const [Answer1, setAnswer1] = useState()
    const [Answer2, setAnswer2] = useState()
    const [Answer3, setAnswer3] = useState()
    const [Answer4, setAnswer4] = useState()
    const [CorrectAnswer, setCorrectAnswer] = useState(Number)



    const newSubtitle = { "Name": name, "Exercises": exercises, "Hours": hours, "Link": link, "Subtitle_description": subtitle_description }

    const handleSubtitles = (x) => {

        if (subtitles.length === 0) {
            setSubtitles([newSubtitle])
        }
        else (
            setSubtitles(current => [...current, newSubtitle])
        )
        setExercises([]);

    };



    const handleSubmit = async (e) => {
        e.preventDefault()

        const newCourse = { "Title": title, "Subject": subject, "Subtitles": subtitles, "Instructor": instructor, "Price": price, "CreditHours": creditHours, "Discount": discount, "Description": description, "Preview": preview }
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
    const Exercise = { "Question": Question, "Answer1": Answer1, "Answer2": Answer2, "Answer3": Answer3, "Answer4": Answer4, "CorrectAnswer": CorrectAnswer }


    const handlexercise = async (e) => {
        if (exercises.length === 0) {
            setExercises([Exercise])
        }
        else (
            setExercises(current => [...current, Exercise])
        )
    }






    return (
        <div className="newCourse">
            <Naavbar />
            <h1>New Course</h1>
            <br></br>
            <Form onSubmit={handleSubmit} >
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Course Title
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control className="input" type="text" placeholder="Title" onChange={(x) => setTitle(x.target.value)} value={title} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Preview
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control className="input" type="text" placeholder="Preview" onChange={(x) => setPreview(x.target.value)} value={preview} />
                    </Col>
                </Form.Group>

                <hr></hr>

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
                    <Form.Label column sm="2">Subtitle Description</Form.Label>
                    <Form.Control
                        className="input2" type="text" placeholder="Subtitle descritption"
                        onChange={(x) => setSubtitle_description(x.target.value)} value={subtitle_description}
                    />
                </Form.Group>

                <hr></hr>
                <h4>
                    Add Exercise
                </h4>
                <Form.Group as={Row}
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label column sm="2">Question</Form.Label>
                    <Form.Control
                        className="input2" type="text" placeholder="Question"
                        onChange={(x) => setQuestion(x.target.value)} value={Question}
                    />
                </Form.Group>

                <Form.Group as={Row}
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label column sm="2">Answer1</Form.Label>
                    <Form.Control
                        className="input2" type="text" placeholder="First Answer"
                        onChange={(x) => setAnswer1(x.target.value)} value={Answer1}
                    />
                </Form.Group>

                <Form.Group as={Row}
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label column sm="2">Answer2</Form.Label>
                    <Form.Control
                        className="input2" type="text" placeholder="Second Answer"
                        onChange={(x) => setAnswer2(x.target.value)} value={Answer2}
                    />
                </Form.Group>

                <Form.Group as={Row}
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label column sm="2">Answer3</Form.Label>
                    <Form.Control
                        className="input2" type="text" placeholder="Third Answer"
                        onChange={(x) => setAnswer3(x.target.value)} value={Answer3}
                    />
                </Form.Group>

                <Form.Group as={Row}
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label column sm="2">Answer4</Form.Label>
                    <Form.Control
                        className="input2" type="text" placeholder="Fourth Answer"
                        onChange={(x) => setAnswer4(x.target.value)} value={Answer4}
                    />
                </Form.Group>

                <Form.Group as={Row}
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label column sm="2">Correct Answer</Form.Label>
                    <Form.Control
                        className="input2" type="Number" placeholder="Correct Answer"
                        onChange={(x) => setCorrectAnswer(x.target.value)} value={CorrectAnswer}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handlexercise}  >
                    Save Exercise
                </Button>
                {exercises && exercises.map((sub => (
                    <p key={sub.length}> * Question: {sub.Question}</p>
                )))}

                <hr></hr>
                <Button variant="primary" onClick={handleSubtitles}  >
                    Save Changes
                </Button>

                {subtitles && subtitles.map((sub => (
                    <p key={sub.length}> * Name: {sub.Name}</p>
                )))}
                <hr></hr>









                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Course Subject
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control className="input" type="text" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} value={subject} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Course Instructor
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control className="input" type="text" placeholder="instructor" onChange={(e) => setInstructor(e.target.value)} value={instructor} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Course CreditHours
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control className="input" type="number" onChange={(e) => setCreditHours(e.target.value)} value={creditHours} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Course Price
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control className="input" type="text" placeholder="price" onChange={(e) => setPrice(e.target.value)} value={price} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Course Discount
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control className="input" type="text" placeholder="discount" onChange={(e) => setDiscount(e.target.value)} value={discount} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Course Description
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control className="desc" as="textarea" rows={3} placeholder="discreption" onChange={(e) => setDescription(e.target.value)} value={description} />
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
