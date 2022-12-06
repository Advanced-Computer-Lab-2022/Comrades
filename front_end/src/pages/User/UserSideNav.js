import "./UserData.js";
import { UserData } from "./UserData.js";
import { NavLink } from "react-router-dom";
import "./UserSideNav.css";




const  UserSideNav=()=> {
  


    return (
        <div className="sidenav" >

        {UserData.map((item =>(
             <NavLink className="sideitem"  key={item.id}  to={item.link}>
             {item.icon}
             <p>{item.text}</p>
             </NavLink>
             

     )
       ))}
        </div>
    )
}

export default UserSideNav;