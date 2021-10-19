import React from "react";
import { Route } from "react-router";
import { Home } from "./Home";
import { AppointmentList } from "./Appointment/AppointmentList";
import { AppointmentEditForm } from "./Appointment/AppointmentEditForm";
import { AppointmentForm } from "./Appointment/AppointmentForm";



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
            <Route exact path="/appointments/create">
                <AppointmentForm />
            </Route>

            <Route exact path="/appointments/:appointmentId(\d+)/edit">
                <AppointmentEditForm />
            </Route>
        </>



    )
}