
import Naavbar from '../components/Navbar';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
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
    const [exercise , setExercise] = useState([]);







    const submitCourseRate = async (event) => {
        console.log("course" , value)
        console.log(name)


    }
    const submitInsRate = async (event) => {
        console.log("Ins" , value2)


    }

    
    


    useEffect(() => {
        const getCourses = async () => {
            const response = await fetch("/api/courses/getCourseById/{\"id\": \"" + userId + "\"}")
            const json = await response.json()

         

            if (response.ok) {
                setCourse(json[0])
                setSubtitle(json[0].Subtitles)
                setExercise(json[0].Subtitles.Exercises)

                console.log(json)
               


                let result = json[0].Preview.substr(32)
                setPrev(result)
            }
        }
        getCourses()
        
    }, [])




    return (
        // Title  Subject  Subtitles  Price  TotalHours  Rating  CreditHours  Discount
        <><Naavbar />
            <div>

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
                    
                            <Col >
                            <Row>
                            <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                                </Row>

                                <Row  sm={4}>
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
                                    }}
                                />
                                </Row>

                                <Row  sm={4}>
                                &nbsp;&nbsp;&nbsp;<Button onClick={submitInsRate}>
                                    Rate Instructor
                                </Button>
                            </Row>

                                
                                
                            </Col>
                           
                            
                    </Row>
                </Container>





                <Container >

               
                    
                    {subtitle && subtitle.map((subtitlee => (
                        
                            <><Col xs={11}>
                            <h5>
                                {subtitlee.Name}
                            </h5>
                        </Col><Col>
                                {subtitlee.Hours}  
                            </Col></>
                    )))}



               

                </Container>






            </div></>


    )
}


export default OneCourse