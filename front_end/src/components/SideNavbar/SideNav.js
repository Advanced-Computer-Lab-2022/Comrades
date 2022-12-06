import "./navData.js";
import { navData } from "./navData.js";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/esm/Button.js";
import "./SideNav.css";




const  SideNav=()=> {
  


    return (
        <div className="sidenav" >

        {navData.map((item =>(
             <NavLink className="sideitem"  key={item.id}  to={item.link}>
             {item.icon}
             <p className="linkText">{item.text}</p>
             </NavLink>
             

     )
       ))}
        </div>
    )
}

export default SideNav;