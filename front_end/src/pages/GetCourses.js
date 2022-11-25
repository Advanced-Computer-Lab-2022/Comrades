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
    const [country, setCountry] = useState()
    const [rate, setRate] = useState(1)
    const [code, setCode] = useState("USD")

    const [countries, setCountries] = useState([]);

    const [open, setOpen] = useState([]);

    const [price, setPrice] = useState('');
    const [subject, setSubject] = useState('');
    const [rating, setRating] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault()
        const fetchCountry = async () => {
            const response = await fetch('/api/courses/getCurrency/' + country)
            const json = await response.json()

            if (response.ok) {
                setCode(json.code);
                setRate(json.rate);
            }
        }
        fetchCountry()
        console.log("Country: " + country)
        console.log(subtitles);
        // console.log("Rate: " + rate)
    }

    const renderSubtitles = (idx, cid) => {

        if (subtitles[idx].id === cid) {
            return (
                <p>{idx + "  " + cid}</p>
            )
        }
    }


    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/courses/getCourses')
            const json = await response.json()
            let sub = [];
            let index = 0;
            if (response.ok) {
                console.log("ok")
                setCourses(json)
                for (let i = 0; i < json.length; i++) {
                    for (let j = 0; j < json[i].Subtitles.length; j++) {
                        sub.push({
                            "index": index,
                            "id": json[i]._id,
                            "arr": json[i].Subtitles[j]
                        })
                        index++;
                    }

                    let newOpen = open;
                    newOpen.push(false)
                    setOpen(newOpen);
                }
                setSubtitles(sub);
            }
        }
        fetchCourses()
        const fetchCountriesList = async () => {
            const response = await fetch('/api/courses/getCountries')
            const json = await response.json();
            if (response.ok) {
                for (let i = 0; i < 243; i++) {
                    countries.push(json[i]);
                }
            }
        }
        fetchCountriesList()
    }, [])

    const getByPrice = async(x) =>{
        
        x.preventDefault()
        const response =  await fetch('/api/courses/filterCoursesByPrice/' + price )
        const json =  await response.json()

        if (response.ok) {
            setCourses(json)
            console.log(json)

        }
    }

    const getBySubjectandRating = async(z) =>{
        
        z.preventDefault()

        const response =  await fetch('/api/courses/filterCoursesBySubjectAndRating/{"subject":'+ subject + ',"rating":'+ rating+'}' )
        const json =  await response.json()

        if (response.ok) {
            setCourses(json)
            console.log(json)


        }
    }



    return (


        <div>
            <Naavbar />
            <br></br>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Select Country:</Form.Label>

                    <Form.Select className="input" onChange={(e) => setCountry(e.target.value)} value={country}>

                        {countries.map(d => (
                            <>
                                <option value={d}>
                                    {d}
                                </option>
                            </>
                        )
                        )}
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

            <Form>
                <Form.Group  className="mb-3" controlId="formPlaintextEmail">
                    
                    <Row sm="10">
                        <Button   style={{ width: '10rem'}} variant="outline-success" placeholder='Price' onClick={getByPrice}>Filter By Price</Button>
                        <Form.Control className="input" type="text" placeholder="Price" onChange={(x) => setPrice(x.target.value)} value={price} />
                    </Row>
                </Form.Group>
          
                <Form.Group  className="mb-3" controlId="formPlaintextEmail">
                    
                    <Row sm="10">
                        <Button   style={{ width: '10rem'}} variant="outline-success" placeholder='Subject' onClick={getBySubjectandRating}>Filter By Subject and Rating</Button>
                        <Form.Control className="input" type="text" placeholder="Subject" onChange={(z) => setSubject(z.target.value)} value={subject} />
                        <Form.Control className="input" type="text" placeholder="Rating" onChange={(z) => setRating(z.target.value)} value={rating} />
                    </Row>
                </Form.Group>
            </Form>


            {courses && courses.map((course => (

                <Card key={course._id} style={{ margin: 45 }}>
                    <Card.Header>{course.Title}</Card.Header>
                    <Card.Body>
                        {/* <Card.Title>Special title treatment</Card.Title> */}
                        <Card.Text>
                            Price: {code}   {course.Price * rate * (1 - course.Discount / 100)} ({course.Discount}%)
                            <br></br>
                            Total Hours: {course.TotalHours}
                            <br></br>
                            Rating: {course.Rating} ☆


                            {subtitles.map((subtitle => (
                                renderSubtitles(subtitle.index, course._id)
                            )))}


                        </Card.Text>
                    </Card.Body>
                </Card>
            )))}


        </div>



    )
}

export default GetCourses