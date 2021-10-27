import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getAllAppointments, getAppointmentById } from "./AppointmentManager"
import { update } from "./AppointmentManager"
import "./AppointmentEditForm.css"
import { getAllChildren } from '../Child/ChildManager';
import { getAllHospitals } from '../Hospital/HospitalManager';




export const AppointmentEditForm = () => {

    let user = parseInt(sessionStorage.getItem("current_user"))
    const [appointment, setAppointment] = useState(
        {

            childId: "", reasonForAppointment: "",
            hospitalId: "", date: "", time: ""
        });
    const [isLoading, setIsLoading] = useState(false);
    // "isLoading" is showing user data is being loaded but is not fully loaded yet
    const { appointmentId } = useParams();
    // useParams lets you access parameters of current <route>
    const [Children, setChildren] = useState([]);
    const [hospitals, setHospitals] = useState([]);
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
            userId: JSON.parse(sessionStorage.getItem("medical_appointment_user")).id,
            id: appointmentId,
            childId: appointment.childId,
            reasonForAppointment: appointment.reasonForAppointment,
            hospitalId: appointment.hospitalId,
            date: appointment.date,
            time: appointment.time

        };
        console.log(editedAppointment)
        update(editedAppointment)
            .then(() => history.push("/appointments")
                // history.push pushes this URL onto all the history in the DOM
            )
    }
    //get childeren for the user from children lisst
    const getUserChildren = () => {
        return getAllChildren(user).then(response => {
            setChildren(response)
        })
    }




    useEffect(() => {
        //load hospital data and setState
        getAllHospitals().then(hospitals => {
            setHospitals(hospitals)
        })
    }, []);

    useEffect(() => {
        //load child data and setState
        getUserChildren();
    }, []);
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
                        <label htmlFor="children">Child: </label>
                        <select value={appointment.childId} name="childId" id="childId" onChange={handleFieldChange}
                            className="form-control" >
                            <option value="0">Select a child</option>
                            {Children.map(child => (
                                <option key={child.id} value={child.id}>
                                    {child.firstName} {child.lastName}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="reasonForAppointment"
                            value={appointment.reasonForAppointment}
                        />
                        <label htmlFor="reasonForAppointment">Reason For Appointment</label>

                        <label htmlFor="hospital">Hospital: </label>
                        <select value={appointment.hospitalId} name="hospitalId" id="hospitalId" onChange={handleFieldChange}
                            className="form-control" >
                            <option value="0">Select Hospital</option>
                            {hospitals.map(l => (
                                <option key={l.id} value={l.id}>
                                    {l.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="date"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="date"
                            value={appointment.date}
                        />
                        <label htmlFor="date">Date</label>

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