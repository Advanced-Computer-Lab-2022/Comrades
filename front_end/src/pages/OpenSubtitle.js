import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { jsPDF } from "jspdf";


import AdminSideNav from "./Admin/AdminSideNav"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Naavbar from '../components/Navbar';


import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'



const OpenSubtitle = () => {
    const { user } = useAuthContext()

    const [Notes, setNotes] = useState("");



    const [subtitle, setSubtitle] = useState([])
    const [exercise, setExercise] = useState([])
    const [link, setLink] = useState([])
    const [sol1, setSol1] = useState()
    const [CorrectAnswer, setCorrectAnswer] = useState()
    const [counter, setCounter] = useState(0)


    const [show1, setShow1] = useState(false);

    const [show2, setShow2] = useState(false);

    const handleClose = () => {
        setShow1(false)
        setShow2(false);
    }






    const params = new URLSearchParams(window.location.search);
    const all = params.get('userId');
    const index = all.charAt(all.length - 1)
    const u = all.slice(0, -1);



    console.log(u)
    // console.log(index)

    const handleSubmit = (ans) => {

        // console.log(typeof sol1)

        // console.log(typeof ans)

        if (sol1 === ans.toString()) {
            setShow1(true)
            setCounter(counter + 10)


        }

        else (
            setCorrectAnswer(ans),

            setShow2(true)


        )
    }

    const renderExercises = (idx, cid) => {



        // if (exercise[idx].id === cid) {
        return (
            <>
                <Container >
                    <Card style={{ width: "40rem" }}>
                        <Card.Header>Exercise {exercise[idx].index}</Card.Header>

                        <Card.Body>
                            <Card.Text>


                                <p>Question : {exercise[idx].arr.Question} </p>

                                <input type="radio" name="Q" value="1" onChange={e => setSol1(e.target.value)} />&nbsp;&nbsp;{exercise[idx].arr.Answer1}
                                <br></br>
                                <br></br>



                                <input type="radio" name="Q" value="2" onChange={e => setSol1(e.target.value)} />&nbsp;&nbsp;{exercise[idx].arr.Answer2}
                                <br></br>
                                <br></br>


                                <input type="radio" name="Q" value="3" onChange={e => setSol1(e.target.value)} />&nbsp;&nbsp;{exercise[idx].arr.Answer3}
                                <br></br>
                                <br></br>


                                <input type="radio" name="Q" value="4" onChange={e => setSol1(e.target.value)} />&nbsp;&nbsp;{exercise[idx].arr.Answer4}
                                <br></br>
                                <br></br>


                                <Button style={{ marginRight: "10px" }} variant="dark" onClick={() => handleSubmit(exercise[idx].arr.CorrectAnswer)} >Submit Answer</Button>
                                <br></br>
                                <br></br>




                            </Card.Text>
                        </Card.Body>
                    </Card>

                </Container>
                <br></br>
            </>
        )
        // }
    }



    useEffect(() => {
        const getSubtitleByIndexAndCourseID = async () => {
            const response = await fetch("/api/courses/getSubtitleByIndexAndCourseID/{\"id\":\"" + u + "\",\"index\":\"" + index + "\"}")
            const json = await response.json()





            if (response.ok) {

                setSubtitle(json)
                console.log(subtitle);

                let exe = [];
                let indexx = 0;

                for (let j = 0; j < json.Exercises.length; j++) {
                    exe.push({
                        "index": indexx,
                        "id": json._id,
                        "arr": json.Exercises[j]
                    })
                    indexx++;
                }



                setExercise(exe);
                // let result = subtitle.link.substr(16)
                // setLink(result)



                const response3 = await fetch("/api/courses/getCourseById/{\"id\": \"" + u + "\"}")
                const json3 = await response3.json()



                const data = { Username: user.username, CourseID: json3[0].Title, SubtitleID: json._id }

                const response2 = await fetch('/api/users/userFinishSubtitle', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })




            }
        }


        if (user !== null) {
            if (user.username !== null) {
                getSubtitleByIndexAndCourseID()
            }
        }






    }, [user])

    // console.log(exercise)
    console.log(subtitle)


    const handleNotes = (e) => {
        e.preventDefault();

        const doc = new jsPDF();
        var splitText = doc.splitTextToSize(Notes, 180);
        doc.text(15, 20, splitText);
        doc.save("Notes.pdf");


    }





    return (
        <><div>
            <Naavbar />


            <Container>




                &nbsp;&nbsp;&nbsp;<h2 style={{ margin: "30px 0px 0px 300px" }}>Tutorial {index} : {subtitle.Name}</h2>

                <br></br>
                <hr style={{ margin: "0px 300px" }}></hr>
                <br></br>

                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${subtitle.Link}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                <br></br>
                <br></br>
                <Form style={{marginLeft:"-40px"}}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Write notes
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control
                                className="input"
                                as="textarea" rows={3}
                                placeholder="Notes"
                                onChange={(e) => setNotes(e.target.value)}
                                value={Notes}
                            />
                        </Col>
                    </Form.Group>
                    <Col sm="10">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;
                        <Button
                            type="submit"
                            variant="dark"
                            onClick={handleNotes}
                        >
                            Download Notes
                        </Button>
                    </Col>
                </Form>
                <br></br>
                <br></br>
                <br></br>

                <h4>
                    Curriculum:
                </h4>
            </Container><br></br><Container>
                &nbsp;&nbsp;&nbsp;<h4>Now Lets Practice</h4>

                {exercise.map((exer => (
                    renderExercises(exer.index, u)
                )))}





            </Container><>

                <Modal show={show1} onHide={handleClose}>
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>  ✔ Your Answer Is Correct!
                        <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your Score : 10/10 .
                    </Modal.Body>

                </Modal>

            </><Modal show={show2} onHide={handleClose}>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body> ❌ Incorrect Answer, The Answer Was Choice Number {CorrectAnswer}.
                    <br></br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your Score : 0/10 .
                </Modal.Body>

            </Modal>
        </div>
        </>





    )

}

export default OpenSubtitle