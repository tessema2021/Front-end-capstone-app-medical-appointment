import React from "react";
import "./AppointmentCard.css"
import { useHistory } from "react-router";





export const AppointmentCard = ({ appointment, handleDeleteAppointment }) => {
    const history = useHistory();
    // allows the timestamp to be put into a human readable format
    const getReadableDate = (date) => {
        return new Date(date).toLocaleDateString();
    }

    const loggedInUser = parseInt(sessionStorage.getItem("medical_appointment_user"));
    if (appointment.userId === loggedInUser) {

        return (
            <div className="appointment_card">
                <><div className="child_name">Full Name :{appointment.child.firstName} {appointment.child.lastName}</div><div className="child_birth">Date of Birth :{appointment.child.dateOfBirth}</div><div className="child_appointment">Reason for appointment :{appointment.reasonForAppointment}</div><div className="hospital_name">Hospital :{appointment.hospital.name}</div><div className="appointment_date">Date :{getReadableDate(appointment.date)}</div><div className="appointment_time">Time :{appointment.time}</div><button className="button-edit" type="button"
                    onClick={() => history.push(`/appointments/${appointment.id}/edit`)}>
                    Edit
                </button><button className="button-delete" type="button" onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>

                </>
            </div >
        )
    } else {
        return (
            <div className="appointment_card">
                <><div className="child_name">Full Name :{appointment.child.firstName} {appointment.child.lastName}</div><div className="child_birth">Date of Birth :{appointment.child.dateOfBirth}</div><div className="child_appointment">Reason for appointment :{appointment.reasonForAppointment}</div><div className="hospital_name">Hospital :{appointment.hospital.name}</div><div className="appointment_date">Date :{getReadableDate(appointment.date)}</div><div className="appointment_time">Time :{appointment.time}</div>
                </>
            </div >
        )

    }
}
  /* </div>
    <div class="flip-card-back">
        <p>Make sure to show up</p>
        <p>15 minute early</p>
        <p>We exacted to see you soon</p>
    </div>
</div > */
// <div class="flip-card">
//   <div class="flip-card-inner">
//     <div class="flip-card-front">
//       
//     </div>
//     <div class="flip-card-back">
//       <h1>John Doe</h1> 
//       <p>Architect & Engineer</p> 
//       <p>We love that guy</p>
//     </div>
//   </div>
// </div>


