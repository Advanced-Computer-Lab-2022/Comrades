
import Naavbar from '../components/Navbar';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import Button from 'react-bootstrap/esm/Button';
import { Rating } from '@mui/material';

import { useEffect, useState } from "react"
import { Container } from '@mui/system';


import { jsPDF } from "jspdf";



const Certificate = () => {
    const params = new URLSearchParams(window.location.search);
    const Username = params.get('Username');
    const Course = params.get('Course').replace(/%/g, " ");

    const doc = new jsPDF({
        orientation: "landscape",
    });


    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();


    doc.roundedRect(5, 5, 286, 198, 2, 2)


    doc.setFontSize(48)
    doc.text("Comrades", 110, 30);
    doc.line(110, 37, 190, 37)
    doc.setFontSize(28)
    doc.text("Course Certificate", 110, 50);

    doc.setFontSize(48)
    doc.text(Course, pageWidth / 2, 90, { align: 'center' });



    doc.setFontSize(16)
    doc.text("Awared to", pageWidth / 2, 110, { align: 'center' });

    doc.setFontSize(24)
    doc.text(Username, pageWidth / 2, 130, { align: 'center' });


    doc.save("a4.pdf");



    useEffect(() => {

    }, [])




    return (
        <>
            <Button href="/" variant="dark" style={{ height: "100vh", width: '100%', paddingTop: "50vh" }}>
                Click here to go to Home Page
            </Button>
        </>
    )
}


export default Certificate