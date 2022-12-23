import "./CTData.js";
import { CTData } from "./CTData.js";
import { NavLink } from "react-router-dom";
import "./AdminSideNav.css";
import { useEffect, useState } from "react"



const CTSideNav = ({ id }) => {

    const [name, setName] = useState(Number)

    useEffect(() => {
        for (let i = 0; i < CTData.length; i++) {
            if (i == id) {
                CTData[i].classes = "sideitem__admin current__item"
            }
            else {
                CTData[i].classes = "sideitem__admin"
            }
        }
        setName(id);
    }, [])


    return (
        <div className="sidenav__admin" >

            {CTData.map((item => (
                <NavLink className="sideitem__admin" key={item.id} to={item.link}>
                    {item.icon}
                    <p className="linkText">{item.text}</p>
                </NavLink>


            )
            ))}
        </div>
    )
}

export default CTSideNav;