import { Button } from "bootstrap";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import Naavbar from "../components/Navbar"




const Home = () => {

  return (
    <div className="home">
      <Naavbar />

      <a href="/home"> Home</a>
      <br></br>
      <a href="/admin"> Admin</a>
      <br></br>
      <a href="/gc"> Get Courses</a>
      <br></br>
      <a href="/gci"> Get Courses by Instructor</a>
      <br></br>
      <a href="/nc"> New Course</a>
      <br></br>
      <a href="/sr"> Search</a>





    </div>
  )
}

export default Home