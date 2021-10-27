import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addChild } from './ChildManager';
import "./ChildList.css"


export const ChildForm = () => {
    // State will contain both article data as well as an isLoading flag.
    // Define the initial state of the form inputs with useState()

    const [children, setChildren] = useState({
        userId: JSON.parse(sessionStorage.getItem("medical_appointment_user")).id,
        firstName: "",
        lastName: "",
        dateOfBirth: ""

    });

    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    //when a field changes, update state. The return will re-render and display based on the values in state
    // NOTE! What's happening in this function can be very difficult to grasp. Read it over many times and ask a lot questions about it.
    //Controlled component

    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newChild = { ...children }
        let selectedVal = event.target.value
        // forms always provide values as strings. But we want to save the ids as numbers.
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        /* Article is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newChild[event.target.id] = selectedVal
        // update state
        setChildren(newChild)
    }

    const handleClickSaveChild = (event) => {
        event.preventDefault()
        addChild(children)
            .then(() => history.push("/children"))

    }

    return (
        <form className="childForm">
            <h2 className="childForm__name">New Child</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">First Name:</label>
                    <input type="text" id="firstName" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="firstName" value={children.firstName} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="lastName" value={children.lastName} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input type="date" id="dateOfBirth" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="dateOfBirth" value={children.dateOfBirth} />
                </div>
            </fieldset>
            <button className="save-btn"
                onClick={handleClickSaveChild}>
                Save  Child
            </button>
        </form>
    )
};