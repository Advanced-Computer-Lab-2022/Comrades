import "./AdminData.js";
import { AdminData } from "./AdminData.js";
import { NavLink } from "react-router-dom";
import "./AdminSideNav.css";
import { useEffect, useState } from "react"



const AdminSideNav = ({ id }) => {

    const [name, setName] = useState(Number)

    useEffect(() => {
        for (let i = 0; i < AdminData.length; i++) {
            if (i == id) {
                AdminData[i].classes = "sideitem__admin current__item"
            }
            else {
                AdminData[i].classes = "sideitem__admin"
            }
        }
        setName(id);
    }, [])


    return (
        <div className="sidenav__admin" >

            {AdminData.map((item => (
                <NavLink className="sideitem__admin" key={item.id} to={item.link}>
                    {item.icon}
                    <p className="linkText">{item.text}</p>
                </NavLink>


            )
            ))}
        </div>
    )
}

export default AdminSideNav;