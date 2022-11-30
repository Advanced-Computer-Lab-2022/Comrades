import "./AdminData.js";
import { AdminData } from "./AdminData.js";
import { NavLink } from "react-router-dom";
import "./AdminSideNav.css";




const  AdminSideNav=()=> {
  


    return (
        <div className="sidenav" >

        {AdminData.map((item =>(
             <NavLink className="sideitem"  key={item.id}  to={item.link}>
             {item.icon}
             <p>{item.text}</p>
             </NavLink>
             

     )
       ))}
        </div>
    )
}

export default AdminSideNav;