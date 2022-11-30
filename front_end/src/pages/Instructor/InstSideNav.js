import "./InstData.js";
import { InstData } from "./InstData.js";
import { NavLink } from "react-router-dom";
import "./InstSideNav.css";




const  AdminSideNav=()=> {
  


    return (
        <div className="sidenav" >

        {InstData.map((item =>(
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