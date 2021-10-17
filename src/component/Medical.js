import React from "react";
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Medical.css"


export const Medical = () => (
    <>
        <Route
            render={() => {
                if (sessionStorage.getItem("medical_appoitment_user")) {
                    return (
                        <>
                            {/* <img className="logo" src={logo}></img> */}
                            <h1>Medical Appointment Site</h1>
                            <NavBar />
                            <ApplicationViews />
                        </>
                    )
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />

        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>

    </>
)
