import React from "react";
//import { Route, Redirect } from "react-router";
import { ApplicationViews } from "./ApplicationViews"
//import { Login } from "./auth/Login"
//import { Register } from "./auth/Register"
import "./Medical.css"
import { NavBar } from "./nav/NavBar";


export const Medical = () => {

    return (
        <>
            <NavBar />
            <ApplicationViews />
        </>
    )
}

