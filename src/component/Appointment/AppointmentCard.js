import React from "react";
import "./AppointmentCard.css"
import { useHistory } from "react-router";


export const AppointmentCard = ({ appointment, handleDeleteAppointment }) => {
    const history = useHistory();


    return (
        <section className="appointment">
            <h5 className="appointment_">{appointment.reasonForAppointment}</h5>
            <div className="appointment_date">{appointment.date}</div>
            <div className="appointment_time">{appointment.time}</div>
            <button type="button"
                onClick={() => history.push(`/appointments/${appointment.id}/edit`)}>
                Edit
            </button>
            <button type="button" onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>

        </section>
    )
}