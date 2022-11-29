import Naavbar from "../components/Navbar"
import Button from 'react-bootstrap/Button';




const Profile = () => {

   
    return (
        

         
      <div className="home">
        <Naavbar/>
  
        <br></br>
        <Button href="/admin" size="sm">Admin</Button>       
        <br></br>
        <br></br>

        <Button href="/gc" size="sm">Show Courses</Button>       
        <br></br>
        <br></br>

        <Button href="/gci" size="sm"> Get Courses by Instructor</Button>
        <br></br>
        <br></br>

        <Button href="/nc" size="sm"> New Course</Button>
        <br></br>
        <br></br>
        <Button href="/sr" size="sm">  Search</Button>
        <br></br>
        <br></br>
        <Button href="/srat" size="sm">  Show Reviews</Button>
  
  
  
  
  
  
      </div>
    )
  }
  
  export default Profile