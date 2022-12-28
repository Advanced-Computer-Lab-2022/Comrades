import Naavbar from "../../components/Navbar.js"
import InstSideNav from "./InstSideNav.js"
import { useEffect, useState } from "react"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


const Instructor = () => {
  const [instructor, setInstructor] = useState("");
  useEffect(() => {

    const fetchInstructor = async () => {
      const response = await fetch("/api/users/getInstructorByID");
      const json = await response.json();
      if (response.ok) {
        setInstructor(json);
        console.log(json);
      }
    };

    fetchInstructor();

    ;


  }, []);



  return (



    <div className="home">
      <Naavbar />
      <Row>
        <Col xs={2}>
        <InstSideNav />

        </Col>
        <Col className="d-flex align-items-left">
        <Card style={{ width: "40rem" }}>
        <Card.Img variant="top" style={{ width: '8rem' }} src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106" />
        <Card.Body>
          <Card.Title>{instructor.Email} &nbsp;  &nbsp;
            <a href="/c" class="btn btn-primary">Edit email</a>
          </Card.Title>
          <Card.Text>
            {instructor.Biography}
            <br></br>
            <a href="/cb" class="btn btn-primary">Edit Bio</a>
          </Card.Text>
          <Card.Text>
            Rating: {instructor.Rating}
            <br></br>
          </Card.Text>

        </Card.Body>
      </Card>
        </Col>
      </Row>

      


    </div>
  )
}

export default Instructor