import React from "react";
import { Route } from "react-router";
import { Home } from "./Home";
import { AppointmentList } from "./Appointment/AppointmentList";
import { AppointmentEditForm } from "./Appointment/AppointmentEditForm";
import { AppointmentForm } from "./Appointment/AppointmentForm";
import { ChildrenList } from "./Child/ChildList";
import { ChildrenEditForm } from "./Child/ChildeditForm";
import { ChildForm } from "./Child/ChildForm";



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
            {/* Render children list when http://localhost:8088/appointments */}
            <Route exact path="/children">
                <ChildrenList />
            </Route>
            <Route exact path="/children/create">
                <ChildForm />
            </Route>
            <Route exact path="/children/:childrenId(\d+)/edit">
                <ChildrenEditForm />
            </Route>
        </>



    )
}