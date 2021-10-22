import React from "react";
import { Route, Redirect } from "react-router";
import { Home } from "./Home";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { AppointmentList } from "./Appointment/AppointmentList";
import { AppointmentEditForm } from "./Appointment/AppointmentEditForm";
import { AppointmentForm } from "./Appointment/AppointmentForm";
import { ChildrenList } from "./Child/ChildList";
import { ChildrenEditForm } from "./Child/ChildeditForm";
import { ChildForm } from "./Child/ChildForm";
import { ReviewList } from "./Review/ReviewList";
import { ReviewForm } from "./Review/ReviewForm";
import { ReviewEditForm } from "./Review/ReviewEditForm";



export const ApplicationViews = ({ isAuthenticated, setAuthUser }) => {




    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            {/* Render the appointment list when http://localhost:8088/appointments */}
            <Route exact path="/appointments">
                {isAuthenticated ? <AppointmentList /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/appointments/create">
                <AppointmentForm />
            </Route>

            <Route exact path="/appointments/:appointmentId(\d+)/edit">
                <AppointmentEditForm />
            </Route>

            <Route exact path="/login">
                <Login setAuthUser={setAuthUser} />
            </Route>

            <Route path="/register">
                <Register setAuthUser={setAuthUser} />
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
            {/* Render children list when http://localhost:8088/appointments */}
            <Route exact path="/reviews">
                <ReviewList />
            </Route>
            <Route exact path="/reviews/create">
                <ReviewForm />
            </Route>
            <Route exact path="/reviews/:reviewId(\d+)/edit">
                <ReviewEditForm />
            </Route>
        </>



    )
}