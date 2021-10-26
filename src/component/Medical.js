import React from "react";
import { ApplicationViews } from "./ApplicationViews"
import "./Medical.css"
import { NavBar } from "./nav/NavBar";
import { useState } from "react";
import logo from "../Images/HH_logo.png"


export const Medical = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("medical_appointment_user") !== null)

    const setAuthUser = (user) => {
        sessionStorage.setItem("medical_appointment_user", JSON.stringify(user))
        sessionStorage.setItem("current_user", user.id)
        setIsAuthenticated(sessionStorage.getItem("medical_appointment_user") !== null)
    }

    const clearUser = () => {
        sessionStorage.clear();
        setIsAuthenticated(sessionStorage.getItem("medical_appointment_user") !== null)
    }

    return (
        <>
            <img className="logo" src={logo}></img>
            <h3 className="home-style"> Medical Appointment App</h3>
            <NavBar clearUser={clearUser} isAuthenticated={isAuthenticated} />
            <ApplicationViews setAuthUser={setAuthUser} isAuthenticated={isAuthenticated} />
        </>
    )




}

