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

const CourseReviews = (prop) => {

    const params = new URLSearchParams(window.location.search);
    const courseID = params.get('courseID');

    const [reviews, setReviews] = useState([]);

    useEffect(() => {


        const fetchReviews = async () => {
            const response = await fetch(`/api/courses/getCourseReviewsById/{"id": "${courseID}"}`);
            const json = await response.json();
            if (response.ok) {
                setReviews(json);
                console.log(json);
            }
        };

        fetchReviews();

    }, []);

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
                    </Navbar.Collapse>
                </Container>
            </Navbar>
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

export default CourseReviews;

