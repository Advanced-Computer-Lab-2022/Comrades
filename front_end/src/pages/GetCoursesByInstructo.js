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
     <Naavbar/>
      <br></br>

     
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

