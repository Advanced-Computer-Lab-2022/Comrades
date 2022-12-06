import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Col from "react-bootstrap/Col";
import CreateIcon from '@mui/icons-material/Create';

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import Naavbar from "../components/Navbar";
import { useEffect, useState } from "react";

const GetCoursesByInstructor = (prop) => {
  const [myCourses, setMyCourses] = useState(null);
  const [search, setSearch] = useState("");
  const [instructor, setInstructor] = useState("");
  const [reviews, setReviews] = useState([]);
  const [cReviews, setCReviews] = useState([]);
  const [price , setPrice] = useState('')
  const [subject , setSubject] = useState('')


  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const fetchSearch = async () => {
      const response = await fetch("/api/courses/searchInstructor/" + search);
      const json = await response.json();

      if (response.ok) {
        setMyCourses(json);
      }
    };
    fetchSearch();
  };
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/courses/getCoursesInstructor");
      const json = await response.json();
      if (response.ok) {
        setMyCourses(json);
        console.log("Done");
      }
    };

    fetchCourses();

    const fetchInstructor = async () => {
      const response = await fetch("/api/users/getInstructorByID");
      const json = await response.json();
      if (response.ok) {
        setInstructor(json);
        console.log(json);
      }
    };

    fetchInstructor();

    const fetchReviews = async () => {
      const response = await fetch("/api/users/getReviewsInstructor");
      const json = await response.json();
      if (response.ok) {
        setReviews(json);
        console.log(json);
      }
    };

    fetchReviews();


  }, []);

  const getByPrice = async(x) =>{
        
    x.preventDefault()
    const response =  await fetch('/api/courses/filterCoursesByPriceInstructor/' + price )
    const json =  await response.json()

    if (response.ok) {
        setMyCourses(json)
        console.log(json)

    }

}

const getBySubject = async(z) =>{
    
    z.preventDefault()
    const response =  await fetch('/api/courses/filterCoursesBySubjectInstructor/' + subject )
    const json =  await response.json()

    if (response.ok) {
        setMyCourses(json)
        console.log(json)

    }
}



  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Comrades{prop.name}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Courses" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Math</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Computer</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Marketing
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Business</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Form className="d-flex" onSubmit={handleSubmit2}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <Button type="submit" variant="outline-success">
                  Search
                </Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br></br>

      <Card style={{ width: "40rem" }}>
        <Card.Img variant="top" style={{ width: '8rem' }} src="https://img-c.udemycdn.com/user/200_H/12613608_fae6.jpg" />
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
      <br></br>
      <br></br>

      <Form>
                <Form.Group  className="mb-3" controlId="formPlaintextEmail">
                    
                    <Row sm="10">
                        <Button   style={{ width: '10rem'}} variant="outline-success" placeholder='Price' onClick={getByPrice}>Filter By Price</Button>
                        <Form.Control className="input" type="text" placeholder="Price" onChange={(x) => setPrice(x.target.value)} value={price} />
                    </Row>
                </Form.Group>
          
                <Form.Group  className="mb-3" controlId="formPlaintextEmail">
                    
                    <Row sm="10">
                        <Button   style={{ width: '10rem'}} variant="outline-success" placeholder='Subject' onClick={getBySubject}>Filter By Subject</Button>
                        <Form.Control className="input" type="text" placeholder="Subject" onChange={(z) => setSubject(z.target.value)} value={subject} />
                    </Row>
                </Form.Group>
            </Form>
      
          <h1>Your Courses</h1>

      <h1>Your Courses</h1>
      {myCourses &&
        myCourses.map((mycourse) => (
          <>
            <br></br>
            <Card key={mycourse._id} style={{ width: "40rem" }}>
              <Card.Header>{mycourse.Title}</Card.Header>
              <Card.Body>
                <Card.Text>
                  Subject:{mycourse.Subject}
                  <br></br>
                  Price: {mycourse.Price}
                  <br></br>
                  Rating: {mycourse.Rating}
                  <br></br>
                  Review: {mycourse.Reviewer}
                  {mycourse.Review}
                </Card.Text>
                <Button variant="primary" onClick={() => window.location.href = `/courseReview?courseID=${mycourse._id}`}>Course Reviews</Button>
                <a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                <a class="btn btn-primary" onClick={() => window.location.href = `/addDiscount?courseID=${mycourse._id}`} >Add Promotion</a>
              </Card.Body>
            </Card>
          </>
        ))}
      <h2> Reviews</h2>
      {reviews &&
        reviews.map((review) => (
          <>
            <br></br>
            <Card key={review._id} style={{ width: "40rem" }}>
              <Card.Body>
                <Card.Text>
                  Reviewer: {review.Reviewer}
                  <br></br>
                  Review: {review.Review}
                </Card.Text>
              </Card.Body>
            </Card>
          </>
        ))}
    </div>
  );
};

export default GetCoursesByInstructor;

