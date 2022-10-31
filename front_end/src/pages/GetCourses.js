import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Collapse from 'react-bootstrap/Collapse';


import Naavbar from '../components/Navbar';
import { useEffect, useState } from "react"

// components

const GetCourses = () => {
    const [subtitles, setSubtitles] = useState([])
    const [courses, setCourses] = useState(null)
    const [country, setCountry] = useState('USA')
    const [rate, setRate] = useState(1)

    const [open, setOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const fetchCountry = async () => {
            const response = await fetch('/api/courses/getCurrency/' + country)
            const json = await response.json()

            if (response.ok) {
                setRate(json)
            }
        }
        fetchCountry()
        console.log("Country: " + country)
        console.log(subtitles);
        // console.log("Rate: " + rate)
    }

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/courses/getCourses')
            const json = await response.json()
            let sub = [json.length];
            if (response.ok) {
                console.log("ok")
                setCourses(json)
                for (let i = 0; i < json.length; i++) {
                    sub[i] = {
                        "_id": json[i]._id,
                        "arr": json[i].Subtitles
                    }
                }
                setSubtitles(sub);
            }
        }
        fetchCourses()
    }, [])

    return (

        <div>
            <Naavbar />
            <br></br>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Select Country:</Form.Label>
                    <Form.Select className="input" onChange={(e) => setCountry(e.target.value)} value={country}>
                        <option value="USA">USA</option>
                        <option value="Germany">Germany</option>
                        <option value="Italy">Italy</option>
                        <option value="France">France</option>
                        <option value="Spain">Spain</option>
                        <option value="Egypt">Egypt</option>
                        <option value="England">England</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="Russia">Russia</option>
                        <option value="Italy">Italy</option>
                    </Form.Select>
                </Form.Group>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="submit" variant="outline-success" onClick={() => { console.log({ country }) }}>Select Country</Button>
            </Form>
            <br></br>

            <h2>&nbsp; &nbsp;Availale Courses:</h2>
            {courses && courses.map((course => (

                <Card key={course._id} style={{ margin: 45 }}>
                    <Card.Header>{course.Title}</Card.Header>
                    <Card.Body>
                        {/* <Card.Title>Special title treatment</Card.Title> */}
                        <Card.Text>
                            Price: {course.Price * rate * (1 - course.Discount / 100)} ({course.Discount}%)
                            <br></br>
                            Total Hours: {course.TotalHours}
                            <br></br>
                            Rating: {course.Rating} ☆


                            <Collapse in={open}>
                                <div id="example-collapse-text" >
                                    {subtitles && subtitles.map((subtitle => (
                                        <p key={subtitle._id} >{subtitle._id} </p>

                                    )))}

                                </div>
                            </Collapse>
                        </Card.Text>
                        <Button onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open} variant="primary">View Details
                        </Button>
                    </Card.Body>
                </Card>



            )))}


        </div>



    )
}

export default GetCourses