import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addAppointment } from './AppointmentManager';
import { getAllChilds } from '../Child/ChildManager';
import { getAllHospitals } from '../Hospital/HospitalManager';


export const AppointmentForm = () => {
    // State will contain both appointment data as well as an isLoading flag.
    // Define the initial state of the form inputs with useState()

    const [appointment, setAppointment] = useState({
        childId: 1,
        reasonForAppointment: "",
        hospitalId: 1,
        date: "",
        time: ""

    });

    const [isLoading, setIsLoading] = useState(false);

    // you will need the the `getAll` in the hospitalManager and ChildManager to complete this section
    const [childs, setChilds] = useState([]);
    const [hospitals, setHospitals] = useState([]);

    const history = useHistory();

    //when a field changes, update state. The return will re-render and display based on the values in state 
    //Controlled component

    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newAppointment = { ...appointment }
        let selectedVal = event.target.value
        // forms always provide values as strings. But we want to save the ids as numbers.
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        /* Customer is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newAppointment[event.target.id] = selectedVal
        // update state
        setAppointment(newAppointment)
    }

    useEffect(() => {
        //load hospital data and setState
        getAllHospitals().then(hospitals => {
            setHospitals(hospitals)
        })
    }, []);

    useEffect(() => {
        //load child data and setState
        getAllChilds().then(childs => {
            setChilds(childs)
        })
    }, []);


    const handleClickSaveAppointment = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form

        const childId = appointment.childId
        const hospitalId = appointment.hospitalId

        if (childId === 0 || hospitalId === 0) {
            window.alert("Please select a child and hospital")
        } else {
            //invoke addAppointment passing appointment as an argument.
            //once complete, change the url and display the appointment list
            addAppointment(appointment)
                .then(() => history.push("/appointments"))
        }
    }

    return (
        <form className="appointmentForm">
            <h2 className="appointmentForm__title">New Appointment</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="reasonForappointment">Reason For Appointment:</label>
                    <input type="text" id="reasonForAppointment" onChange={handleControlledInputChange}
                        required autoFocus className="form-control" placeholder="reason for Appointment" value={appointment.reasonForAppointment} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" onChange={handleControlledInputChange}
                        required autoFocus className="form-control" placeholder="date" value={appointment.date} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Date:</label>
                    <input type="time" id="time" onChange={handleControlledInputChange}
                        required autoFocus className="form-control" placeholder="time" value={appointment.time} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hospital">Hospital: </label>
                    <select value={appointment.hospitalId} name="hospitalId" id="hospitalId" onChange={handleControlledInputChange} className="form-control" >
                        <option value="0">Select Hospital</option>
                        {hospitals.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="childId">Child: </label>
                    <select value={appointment.childId} name="child" id="childId" onChange={handleControlledInputChange} className="form-control" >
                        <option value="0">Select a child</option>
                        {childs.map(child => (
                            <option key={child.id} value={child.id}>
                                {child.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary"
                onClick={handleClickSaveAppointment}>
                Save Appointment
            </button>
        </form>
    )
};