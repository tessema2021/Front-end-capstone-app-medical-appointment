import React from "react";
import logo from "../Images/child.png"
import "./Home.css"





export const Home = () => {


    return (
        <>
            <h4 className="welcome">Welcome To Our Site Where Making Appointment is Simple</h4>
            <p className="welcome">Start your appointment by login </p>
            <img className="home_imge" src={logo} alt="log"></img>
            <footer> <p>&copy; Copyright 2021 Medical Appointment App</p> </footer>

        </>
    )
}