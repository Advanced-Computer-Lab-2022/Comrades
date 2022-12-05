import Naavbar from "../components/Navbar";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const ChangeBio = () => {
  const [Biography, setBiography] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      '/api/users/changeBio/{"Biography": "' + Biography + '"}',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      console.log(json);
    }
  };

  return (
    <>
      <Naavbar />

      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Enter New Bio
          </Form.Label>
          <Col sm="2">
            <Form.Control
              className="input"
              type="text"
              placeholder="New Bio"
              onChange={(e) => setBiography(e.target.value)}
              value={Biography}
            />
          </Col>
        </Form.Group>
        <Col sm="10">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            type="submit"
            variant="outline-success"
            onClick={handleSubmit}
          >
            Save Bio
          </Button>
        </Col>
      </Form>
    </>
  );
};

export default ChangeBio;

