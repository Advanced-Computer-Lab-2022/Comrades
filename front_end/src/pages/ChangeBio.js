import Naavbar from "../components/Navbar";
import { useState } from "react";

// 43 & 44
import { jsPDF } from "jspdf";
// Done


import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const ChangeBio = () => {
  const [Biography, setBiography] = useState("");
  const [Notes, setNotes] = useState("");

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


  // 43 & 44
  const handleSubmit2 = (e) => {
    e.preventDefault();

    const doc = new jsPDF();
    var splitText = doc.splitTextToSize(Notes, 180);
    doc.text(15, 20, splitText);
    doc.save("Notes.pdf");


  }
  // Done

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
      <br></br>
      <br></br>
      <br></br>



      // 43 & 44
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Write notes
          </Form.Label>
          <Col sm="2">
            <Form.Control
              className="input"
              type="longtext"
              placeholder="Notes"
              onChange={(e) => setNotes(e.target.value)}
              value={Notes}
            />
          </Col>
        </Form.Group>
        <Col sm="10">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            type="submit"
            variant="outline-success"
            onClick={handleSubmit2}
          >
            Download Notes
          </Button>
        </Col>
      </Form>
      // Done
    </>
  );
};

export default ChangeBio;

