
import Naavbar from '../components/Navbar';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import Button from 'react-bootstrap/esm/Button';
import { Rating } from '@mui/material';

import { useEffect, useState } from "react"
import { Container } from '@mui/system';




const OneCourse = () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    // console.log(userId);
    const [course, setCourse] = useState([]);
    const [subtitle, setSubtitle] = useState([]);
    const [prev, setPrev] = useState('');
    const [name, setName] = useState([]);
    const [value, setValue] = useState(Number);
    const [value2, setValue2] = useState(Number);
    const [exercise, setExercise] = useState([]);







    const submitCourseRate = async (event) => {
        console.log("course", value)
        console.log(name)


    }
    const submitInsRate = async (event) => {
        console.log("Ins", value2)


    }
    const renderSubtitles = (idx, cid) => {

        if (subtitle[idx].id === cid) {
            return (
                <>
                    <Container onClick={() => window.location.href = `/os?userId=${course._id}${subtitle[idx].index}`}>
                        <Card style={{ width: "40rem" }}>
                            <Card.Body>
                                <Card.Text>
                                    <p>{subtitle[idx].index+1}. Subtitle:{subtitle[idx].arr.Name}</p>
                                    <p>{subtitle[idx].arr.Hours} Hours</p>


                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </Container>
                    <br></br>
                </>
            )
        }
    }





    useEffect(() => {
        const getCourses = async () => {
            const response = await fetch("/api/courses/getCourseById/{\"id\": \"" + userId + "\"}")
            const json = await response.json()



            if (response.ok) {

                setCourse(json[0])
                console.log(json)
                let sub = [];
                let index = 0;

                for (let j = 0; j < json[0].Subtitles.length; j++) {
                    sub.push({
                        "index": index,
                        "id": json[0]._id,
                        "arr": json[0].Subtitles[j]
                    })
                    index++;
                }



                setSubtitle(sub);
                console.log(subtitle.index)



                let result = json[0].Preview.substr(17)
                setPrev(result)
            }
        }
        getCourses()

    }, [])




    return (
        <>
            <Naavbar /><div>

                <h2 style={{ textAlign: "center" }}>{course.Title}</h2>







                <Container className="d-flex justify-content-center">
                    <br></br>
                    <h1 style={{ textAlign: "center" }}>{course.Title}</h1>
                    <br></br>
                    <br></br>
                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${prev}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                </Container>


                <br></br>
                <Container>
                    <Row>
                        <Col>
                            &nbsp;&nbsp;&nbsp;Subject : {course.Subject}
                            <br></br>


                            &nbsp;&nbsp;&nbsp;Instructor : {course.Instructor}
                            <br></br>


                            &nbsp;&nbsp;&nbsp;Credit Hours : {course.CreditHours}
                            <br></br>

                            &nbsp;&nbsp;&nbsp;Total Hours : {course.TotalHours}
                            <br></br>

                            &nbsp;&nbsp;&nbsp;Price : {course.Price}
                            <br></br>

                            &nbsp;&nbsp;&nbsp;Discount : {course.Discount}%
                            <br></br>

                            &nbsp;&nbsp;&nbsp;Rating : {course.Rating}
                            <br></br>

                            &nbsp;&nbsp;&nbsp;Description : {course.Description}
                            <br></br>
                            <br></br>
                            <br></br>

                        </Col>

                        <Col>
                            <Row>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }} />
                            </Row>

                            <Row sm={4}>
                                &nbsp;&nbsp;&nbsp;<Button onClick={submitCourseRate}>
                                    Rate Course
                                </Button>
                            </Row>
                            <br></br>
                            <Row>
                                <Rating
                                    name="simple-controlled"
                                    value={value2}
                                    onChange={(event2, newValue) => {
                                        setValue2(newValue);
                                    }} />
                            </Row>

                            <Row sm={4}>
                                &nbsp;&nbsp;&nbsp;<Button onClick={submitInsRate}>
                                    Rate Instructor
                                </Button>
                            </Row>



                        </Col>


                    </Row>
                </Container>









                {/* 
                {subtitle && subtitle.map((subtitlee => (

                    <Container className="course__card" key={subtitlee._id} onClick={() => window.location.href = `/os?userId=${course._id}`}>
                        <br></br>
                        <><Card style={{ width: "40rem" }}>
                            <Card.Body>
                                <Card.Text>
                                    {subtitlee.index}.Subtitle: {subtitlee.arr}
                                    <br></br>
                                    {subtitlee.Hours} Hours
                                    
                                </Card.Text>
                            </Card.Body>
                        </Card></>

                    </Container>

                )))} */}
                
                <br></br>
                {subtitle.map((subtitlee => (
                    renderSubtitles(subtitlee.index, userId)
                )))}












            </div></>


    )
}


export default OneCourse