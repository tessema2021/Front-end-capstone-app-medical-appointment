import React, { useEffect, useState } from 'react';
import { getAllAppointments, deleteAppointment } from "./AppointmentManager"
import { AppointmentCard } from './AppointmentCard';
import { useHistory } from 'react-router';
import "./AppointmentList.css"

export const AppointmentList = () => {

    const [appointments, setAppointments] = useState([]);
    const history = useHistory();

    const getAppointments = () => {
        return getAllAppointments().then(appointmentsFromAPI => {
            // We'll do something more interesting with this data soon.
            console.log(appointmentsFromAPI);
            setAppointments(appointmentsFromAPI);
        });
    };


    const handleDeleteAppointment = id => {
        deleteAppointment(id)
            .then(() => getAllAppointments().then(setAppointments));
    };




    useEffect(() => {
        getAppointments();
    }, []);

    return (
        <>

            <section className="section-content">
                <button type="button"
                    className="btn"
                    onClick={() => { history.push("/appointments/create") }}>
                    Add Appointment
                </button>
            </section>

            <div className="container-cards">
                {appointments.map(appointment => <AppointmentCard key={appointment.id} appointment={appointment} handleDeleteAppointment={handleDeleteAppointment} />)}
            </div>
        </>
    );
};
