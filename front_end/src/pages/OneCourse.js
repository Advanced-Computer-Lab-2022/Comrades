
import Naavbar from '../components/Navbar';


import { useEffect, useState } from "react"




const OneCourse = () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    console.log(userId);
    const [course, setCourse] = useState([]);

        

    useEffect(() => {
        const getCourses = async () => {
            const response = await fetch("/api/courses/getCourseById/{\"id\": \"" + userId + "\"}")
            const json = await response.json()
            if (response.ok) {
                setCourse(json[0])

                console.log(json)
            }
            
            
        }
        getCourses()
    },[])

    


    return (
        // Title  Subject  Subtitles  Price  TotalHours  Rating  CreditHours  Discount
        <><Naavbar />
        <p>
            {course.Title}
            <br></br>
            {course.Subject}
            <br></br>


            {/* {course.Subtitles} */}
            {course.Price}
            <br></br>

            {course.TotalHours}
            <br></br>

            {course.Rating}
            <br></br>

            {course.CreditHours}
            <br></br>

            {course.Discount}


        </p></> 
           

    )
}


export default OneCourse