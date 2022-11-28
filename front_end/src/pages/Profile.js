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

        <Button href="/Contract" size="sm">Get Contract</Button>      
        {/* <Button size="sm"><Link to={{ pathname: "/Contract" }}>View Contract</Link></Button>        */} 
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
  
  
  
  
  
  
      </div>
    )
  }
  
  export default Profile