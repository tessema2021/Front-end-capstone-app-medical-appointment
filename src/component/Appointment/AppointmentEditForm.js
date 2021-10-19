import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getAppointmentById } from "./AppointmentManager"
import { update } from "./AppointmentManager"


export const AppointmentEditForm = () => {
    const [appointment, setAppointment] = useState({ reasonForAppointment: "", date: "", time: "" });
    const [isLoading, setIsLoading] = useState(false);
    // "isLoading" is showing user data is being loaded but is not fully loaded yet
    const { appointmentId } = useParams();
    // useParams lets you access parameters of current <route>
    const history = useHistory();
    // useHistory all the URL visited on DOM
    const handleFieldChange = evt => {
        const stateToChange = { ...appointment };
        stateToChange[evt.target.id] = evt.target.value;
        setAppointment(stateToChange);
    };
    // preventDefault---you dont want HTML to handle your code by default
    const updateExistingAppointment = evt => {
        evt.preventDefault()
        setIsLoading(true);

        // This is an edit, so we need the id
        const editedAppointment = {
            id: appointmentId,
            date: appointment.date,
            time: appointment.time

        };
        console.log(editedAppointment)
        update(editedAppointment)
            .then(() => history.push("/")
                // history.push pushes this URL onto all the history in the DOM
            )
    }
    // useEffect tells react component it needs to do something after rendering
    useEffect(() => {
        getAppointmentById(appointmentId)
            .then(appointment => {
                setAppointment(appointment);
                setIsLoading(false);
            });
    }, [appointmentId]);

    return (
        <>
            <form>
                <fieldset>
                    <div className="formgrid">
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="reasonForAppointment"
                            value={appointment.reasonForAppointment}
                        />
                        <label htmlFor="reasonForAppointment">Reason For Appointment</label>

                        <input
                            type="date"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="date"
                            value={appointment.date}
                        />
                        <label htmlFor="synopsis">Date</label>

                        <input
                            type="time"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="time"
                            value={appointment.time}
                        />
                        <label htmlFor="time">Time</label>

                    </div>
                    <div className="alignRight">
                        <button
                            type="button"
                            onClick={updateExistingAppointment}
                            className="btn btn-primary"
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
    );
}