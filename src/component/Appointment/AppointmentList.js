import React, { useEffect, useState } from 'react';
import { getAllAppointments, deleteAppointment } from "./AppointmentManager"
import { AppointmentCard } from './AppointmentCard';
import { useHistory } from 'react-router';
import "./AppointmentList.css"

export const AppointmentList = () => {

    const [appointments, setAppointments] = useState([]);
    const history = useHistory();

    const getAppointments = () => {
        // After the data comes back from the API, we
        //     //  use the setArticles function to update state
        return getAllAppointments().then(appointmentsFromAPI => {
            // We'll do something more interesting with this data soon.
            const sortedActivities = appointmentsFromAPI.sort((a, b) => b.timestamp - a.timestamp)
            setAppointments(sortedActivities);
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
                    className="add-btn"
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
