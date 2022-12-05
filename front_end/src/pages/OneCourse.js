
import Naavbar from '../components/Navbar';


import { useEffect, useState } from "react"




const OneCourse = () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    // console.log(userId);
    const [course, setCourse] = useState([]);
    const [subtitle, setSubtitle] = useState([]);
    const [prev, setPrev] = useState('');

    


    const renderSubtitles = (idx, cid) => {

        if (subtitle[idx].id === cid) {
            return (
                <>
                <p>{subtitle[idx].arr.Name }</p>
                <p>{subtitle[idx].arr.Link }</p></>
            )
        }
    }

   
    useEffect(() => {
        const getCourses = async () => {
            const response = await fetch("/api/courses/getCourseById/{\"id\": \"" + userId + "\"}")
            const json = await response.json()
            
            //    setSubtitle( await json[0].Subtitles[0]);
            //    console.log(subtitle)
    
            if (response.ok) {
                setCourse(json[0])
                console.log(json)
                let sub = [];
                let index = 0;
                for (let i = 0; i < json[0].Subtitles.length; i++) {
                        sub.push({
                            "index": index,
                            "id": json[0]._id,
                            "arr": json[0].Subtitles[i]
                        })
                        index++;   
                }
                setSubtitle(sub);
                let result = json[0].Preview.substr(32)
                setPrev(result)
            }    
        }
        getCourses()
    },[])

    


    return (
        // Title  Subject  Subtitles  Price  TotalHours  Rating  CreditHours  Discount
        <><Naavbar />
        <div>
            <h1 style={{textAlign:"center"}}>{course.Title}</h1>
            
            <br></br>
            <p>
            &nbsp;&nbsp;&nbsp;Subject:{course.Subject}
            <br></br>

            &nbsp;&nbsp;&nbsp;Instructor:{course.Instructor}
            <br></br>

            &nbsp;&nbsp;&nbsp;Credit Hours:{course.CreditHours}
            <br></br>

            &nbsp;&nbsp;&nbsp;Total Hours:{course.TotalHours}
            <br></br>

            &nbsp;&nbsp;&nbsp;Price:{course.Price}
            <br></br>

            &nbsp;&nbsp;&nbsp;Discount:{course.Discount}%
            <br></br>

            &nbsp;&nbsp;&nbsp;Rating:{course.Rating}
            <br></br>

            &nbsp;&nbsp;&nbsp;Description:{course.Description}
            <br></br>
            <br></br>
            <br></br>


         

            <>
            <h3>Preview</h3>
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${prev}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </>
          

            


        </p>

        {subtitle.map((subtitlee => (
                                renderSubtitles(subtitlee.index, userId)
                            )))}
        </div></> 
           

    )
}


export default OneCourse