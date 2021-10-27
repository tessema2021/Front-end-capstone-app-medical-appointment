
import React from "react"
import "./AppointmentCard.css"
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export const FirstAppointmentCard = ({ appointment, handleDeleteAppointment }) => {

    const history = useHistory();
    // make the date human readable
    const getReadableDate = (date) => {
        console.log(new Date(date.replace(/-/g, '\/')))
        const ReadableDate = new Date(date.replace(/-/g, '\/')).toLocaleDateString();
        return ReadableDate
    }
    return (

        <div className="first_card">
            {/* <div class="flip-card-inner">
            <div class="flip-card-front"> */}

            <div className="child_name">Full Name :{appointment.child.firstName} {appointment.child.lastName}</div>
            <div className="child_birth">Date of Birth :{getReadableDate(appointment.child.dateOfBirth)}</div>
            <div className="child_appointment">Reason for appointment :{appointment.reasonForAppointment}</div>
            <div className="hospital_name">Hospital :{appointment.hospital.name}</div>
            <div className="appointment_date">Date :{getReadableDate(appointment.date)}</div>
            <div className="appointment_time">Time :{appointment.time}</div>
            <button className="button-edit" type="button"
                onClick={() => history.push(`/appointments/${appointment.id}/edit`)}>
                Edit
            </button>
            <button className="button-delete" type="button" onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
            {/* </div>
            <div class="flip-card-back">
                <p>Make sure to show up</p>
                <p>15 minute early</p>
                <p>We exacted to see you soon</p>
            </div>
        </div > */}
        </div >
    )
}