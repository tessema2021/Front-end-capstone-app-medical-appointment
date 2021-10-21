import React from "react";
import "./AppointmentCard.css"
import { useHistory } from "react-router";


export const AppointmentCard = ({ appointment, handleDeleteAppointment }) => {
    const history = useHistory();


    return (
        <div className="appointment_card">
            <h5 className="child_name"> {appointment.child.firstName} {appointment.child.lastName}</h5>
            <h5 className="child_birth">Date of Birth {appointment.child.dateOfBirth}</h5>
            <h5 className="child_appointment">Reason for appointment {appointment.reasonForAppointment}</h5>
            <div className="hospital_name">Hospital {appointment.hospital.name}</div>
            <div className="appointment_date">date {appointment.date}</div>
            <div className="appointment_time">Time {appointment.time}</div>
            <button className="button-edit" type="button"
                onClick={() => history.push(`/appointments/${appointment.id}/edit`)}>
                Edit
            </button>
            <button className="button-delete" type="button" onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>

        </div>
    )
}