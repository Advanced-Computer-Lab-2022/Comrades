import "./ITData.js";
import { ITData } from "./ITData.js";
import { NavLink } from "react-router-dom";
import "./AdminSideNav.css";
import { useEffect, useState } from "react"



const ITSideNav = ({ id }) => {

    const [name, setName] = useState(Number)

    useEffect(() => {
        for (let i = 0; i < ITData.length; i++) {
            if (i == id) {
                ITData[i].classes = "sideitem__admin current__item"
            }
            else {
                ITData[i].classes = "sideitem__admin"
            }
        }
        setName(id);
    }, [])


    return (
        <div className="sidenav__admin" >

            {ITData.map((item => (
                <NavLink className="sideitem__admin" key={item.id} to={item.link}>
                    {item.icon}
                    <p className="linkText">{item.text}</p>
                </NavLink>


            )
            ))}
        </div>
    )
}

export default ITSideNav;