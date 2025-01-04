import React from "react";
import Logo from "../../assets/logoWhite.png"
import { Link } from 'react-router-dom';

const HomeLogout = () => {

    return(
        <div className="home1">
            <img src={Logo} alt="Logo" />
            <div className="optionsHomeSelection">
            <Link to="/login"><button className="filled ButtonHome">Login</button></Link>
            <Link to="/register"><button className="outline ButtonHome">Register</button></Link>
            </div>
        </div>
    )

}

export default HomeLogout;