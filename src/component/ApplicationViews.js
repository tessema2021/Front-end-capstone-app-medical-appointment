import React from "react";
import { Route } from "react-router";
import { Home } from "./Home";
import { AppointmentList } from "./Appointment/AppointmentList";



export const ApplicationViews = () => {




    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            {/* Render the appointment list when http://localhost:8088/appointments */}
            <Route exact path="/appointments">
                <AppointmentList />
            </Route>
        </>



    )
}