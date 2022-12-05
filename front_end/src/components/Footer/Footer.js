import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import LanguageIcon from '@mui/icons-material/Language';



const Footer = () => {
    return (
        <div style={{ backgroundColor: "black" }}>
            <br></br>
            <br></br>
            <Container style={{color:"white"}}>
                <Row>
                    <Col>Comrades Bussiness</Col>
                    <Col>Careers</Col>
                    <Col>Terms</Col>
                    <Col></Col>
                    <Col>
                        <LanguageIcon />  ENGLISH
                    </Col>
                </Row>
                <Row>
                    <Col>Teach on Comrades</Col>
                    <Col>Blog</Col>
                    <Col>Privacy policy</Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>About us</Col>
                    <Col>Affilate</Col>
                    <Col>Sitemap</Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>Contact us</Col>
                    <Col>Investors</Col>
                    <Col>Cookies</Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Row>
                    <Col>
                        <h3>
                            Comrades
                        </h3>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                        <h6>
                            © 2023 Comrades, Inc.
                        </h6>
                    </Col>
                </Row>


            </Container>
            <br></br>
            <br></br>
        </div>
    );

}

export default Footer

