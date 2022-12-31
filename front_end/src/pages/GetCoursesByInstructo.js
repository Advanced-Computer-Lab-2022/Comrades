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
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import Naavbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"
import InstSideNav from "../pages/Instructor/InstSideNav"

const GetCoursesByInstructor = (prop) => {
  const { user } = useAuthContext()

  const [myCourses, setMyCourses] = useState(null);
  const [search, setSearch] = useState("");
  const [reviews, setReviews] = useState([]);
  const [cReviews, setCReviews] = useState([]);
  const [price, setPrice] = useState('')
  const [subject, setSubject] = useState('')


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

  const handleSubmit3 = async (e) => {
    e.preventDefault()
    const fetchSearch = async () => {
      const response = await fetch(`/api/courses/searchInstructor/{"Search":"${search}", "Instructor":"${user.username}"}`)
      const json = await response.json()

      if (response.ok) {
        setMyCourses(json)
      }
    }
    fetchSearch()
  }


  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/courses/getCoursesInstructor/" + user.username);
      const json = await response.json();
      if (response.ok) {
        setMyCourses(json);
        console.log("Done");
      }
    };

    const fetchInstructor = async () => {
      const response = await fetch("/api/users/getInstructorByID");
      const json = await response.json();
      if (response.ok) {
        setInstructor(json);
        console.log(json);
      }
    };



    const fetchReviews = async () => {
      const response = await fetch("/api/users/getReviewsInstructor");
      const json = await response.json();
      if (response.ok) {
        setReviews(json);
        console.log(json);
      }
    };

    if (user !== null) {
      if (user.username !== null)
        fetchCourses();
    }


  }, [user]);

  const getByPrice = async (x) => {

    x.preventDefault()
    const response = await fetch(`/api/courses/filterCoursesByPriceInstructor/{"Price":${price},"Instructor":"${user.username}"}`)
    const json = await response.json()

    if (response.ok) {
      setMyCourses(json)
      console.log(json)

    }

  }

  const getBySubject = async (z) => {

    z.preventDefault()
    const response = await fetch(`/api/courses/filterCoursesBySubjectInstructor/{"Subject":"${subject}","Instructor":"${user.username}"}`)
    const json = await response.json()

    if (response.ok) {
      setMyCourses(json)
      console.log(json)

    }
  }

  const [showAlert, setShowAlert] = useState(false);
  function AlertDismissibleExample() {

    if (showAlert) {
      return (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Problem have been reported!</Alert.Heading>
          <p>
            Sorry for the pain, hope it gets resolved too quick.
          </p>
        </Alert>
      );
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [reportedCourseName, setReportedCourseName] = useState("");


  const reportProblem = (e, course) => {
    e.preventDefault();
    setReportedCourseName(course);
    handleShow();

  }


  // ########################################################################


  const submitReport = async (e) => {
    e.preventDefault();

    const data = { "ProblemVal": details, "UserID": user.username, "ProblemType": type, "CourseID": reportedCourseName }

    const response = await fetch('/api/problems/createTestProblem', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (response.ok) {
      handleClose();
      setShowAlert(true);
    }
  }

  const [type, setType] = useState("Financial")
  const [details, setDetails] = useState("Details")




  return (
    <div>
      <div className="home">
        <Naavbar />
        <Row>
          <Col xs={2}>
            <InstSideNav />
          </Col>
          <Col className="d-flex align-items-left" style={{ paddingTop: "40px" }}>

            <Row>
              <AlertDismissibleExample />
              <h2>
                Search through your courses:
              </h2>
              <p>
                Use either: {" "}
                <span style={{ fontWeight: "500" }}>
                  Course title or Subject
                </span>
                .
              </p>
              <Form className="d-flex" onSubmit={handleSubmit3} style={{ marginBottom: "48px" }}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)} value={search}
                />
                <Button type="submit" variant="dark">Search</Button>
              </Form>

              <hr></hr>
              <br></br>
              <br></br>

              <Col xs={3} className="filters__wrapper">
                <Form>
                  <Form.Group className="mb-3" controlId="formPlaintextEmail">
                    <Row sm="10">
                      <h4 style={{ textAlign: "left", margin: "0px" }}>Price</h4>
                      <p style={{ textAlign: "left" }}>
                        (Less than or equal)
                      </p>
                      <Form.Control style={{ marginLeft: "10px", width: "120px" }} className="input" type="text" placeholder="Price" onChange={(x) => setPrice(x.target.value)} value={price} />
                      <Button style={{ marginLeft: "10px", marginTop: "6px", width: '100px' }} variant="dark" placeholder='Price' onClick={getByPrice}>Filter</Button>
                    </Row>
                  </Form.Group>

                  <br></br>
                  <hr></hr>
                  <br></br>

                  <Form.Group className="mb-3" controlId="formPlaintextEmail">
                    <Row sm="10">
                      <h4 style={{ textAlign: "left", margin: "0px" }}>Subject</h4>
                      <Form.Control style={{ marginLeft: "10px", width: "120px", marginTop: "6px" }} className="input" type="text" placeholder="Subject" onChange={(z) => setSubject(z.target.value)} value={subject} />
                      <Button style={{ marginLeft: "10px", marginTop: "6px", width: '100px' }} variant="dark" placeholder='Subject' onClick={getBySubject}>Filter</Button>
                    </Row>
                  </Form.Group>



                </Form>
              </Col>
              <Col>
                {myCourses && myCourses.map((course => (
                  <Container className="course__card" key={course._id} >
                    <Card style={{ marginTop: "20px" }} className="course__card" key={course._id} >
                      <Card.Header style={{backgroundColor: "#212529", color:"White"}} as="h6">
                        {course.Title} - {course.Rating}🌟
                      </Card.Header>
                      <Card.Body>
                        <p>
                          Subject: {course.Subject}
                        </p>
                        <p>
                          Original Price: {course.Price}
                        </p>
                        <p>
                          Discounted Price: {course.DiscountedPrice}
                        </p>
                        <Button style={{ float: "right" }} variant="danger" onClick={(e) => reportProblem(e, course.Title)} > <ReportProblemIcon></ReportProblemIcon>  </Button>

                      </Card.Body>
                    </Card>
                  </Container>
                )))}
              </Col>
            </Row>
            <hr></hr>
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Report Problem with Course: {reportedCourseName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group style={{ textAlign: "left" }} className="mb-3" controlId="exampleForm.ControlInput1">
                <h5>
                  Select your problem type.
                </h5>
                <p> Financial, Technical or Other </p>
                <Form.Select aria-label="Default select example" onChange={(x) => setType(x.target.value)}>
                  <option value="Financial">Financial</option>
                  <option value="Technical">Technical</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
              <Form.Group style={{ textAlign: "left" }} className="mb-3" controlId="exampleForm.ControlTextarea1">
                <h5>
                  Problem Details
                </h5>
                <p> Write in details as possible, make it easier for our admins. </p>
                <Form.Control as="textarea" rows={3} onChange={(x) => setDetails(x.target.value)} />
              </Form.Group>
            </Form>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={(e) => submitReport(e)}>
              Report
            </Button>
          </Modal.Footer>
        </Modal>
      </div>


      <br></br>


      <br></br>
      <br></br>



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

