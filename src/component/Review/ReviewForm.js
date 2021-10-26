import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addReview } from './ReviewManager';
import { getAllHospitals } from '../Hospital/HospitalManager';
import "./ReviewList.css"


export const ReviewForm = () => {
    // State will contain both appointment data as well as an isLoading flag.
    // Define the initial state of the form inputs with useState()

    const [review, setReview] = useState({
        userId: JSON.parse(sessionStorage.getItem("medical_appointment_user")).id,
        hospitalId: 1,
        howEasyWasToScheduleAppointment: "",
        howLongDidYouWait: "",
        howSatisfiedAreYou: " ",
        howWouldYouRateTheOverAllCare1to10: "",
        date: ""

    });

    //const [isLoading, setIsLoading] = useState(false);

    // you will need the the `getAll` in the hospitalManager  to complete this section
    const [hospitals, setHospitals] = useState([]);

    const history = useHistory();

    //when a field changes, update state. The return will re-render and display based on the values in state 
    //Controlled component

    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newReview = { ...review }
        let selectedVal = event.target.value
        // forms always provide values as strings. But we want to save the ids as numbers.
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        /* Customer is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newReview[event.target.id] = selectedVal
        // update state
        setReview(newReview)
    }

    useEffect(() => {
        //load hospital data and setState
        getAllHospitals().then(hospitals => {
            setHospitals(hospitals)
        })
    }, []);




    const handleClickSaveReview = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form


        const hospitalId = review.hospitalId

        if (hospitalId === 0) {
            window.alert("Please select  hospital")
        } else {
            //invoke addAppointment passing appointment as an argument.
            //once complete, change the url and display the appointment list
            addReview(review)
                .then(() => history.push("/reviews"))
        }
    }

    return (
        <form className="reviewForm">
            <h2 className="reviewForm__title">New Review</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hospital">Hospital: </label>
                    <select value={review.hospitalId} name="hospitalId" id="hospitalId" onChange={handleControlledInputChange} className="form-control" >
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
                    <label htmlFor="howEasyWasToScheduleAppointment">How easy was to schedule appointment:</label>
                    <input type="text" id="howEasyWasToScheduleAppointment" onChange={handleControlledInputChange}
                        required autoFocus className="form-control" placeholder="howEasyWasToScheduleAppointment" value={review.howEasyWasToScheduleAppointment} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="howLongDidYouWait">how long did you wait:</label>
                    <input type="text" id="howLongDidYouWait" onChange={handleControlledInputChange}
                        required autoFocus className="form-control" placeholder="text" value={review.howLongDidYouWait} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="howSatisfiedAreYou">How satisfied are you:</label>
                    <input type="text" id="howSatisfiedAreYou" onChange={handleControlledInputChange}
                        required autoFocus className="form-control" placeholder="text" value={review.howSatisfiedAreYou} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="howWouldYouRateTheOverAllCare1to10">How would you rate the over all care 1 to 10:</label>
                    <input type="number" id="howWouldYouRateTheOverAllCare1to10" onChange={handleControlledInputChange}
                        required autoFocus className="form-control" placeholder="number" value={review.howWouldYouRateTheOverAllCare1to10} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" onChange={handleControlledInputChange}
                        required autoFocus className="form-control" placeholder="date" value={review.date} />
                </div>
            </fieldset>

            <button className="save-btn"
                onClick={handleClickSaveReview}>
                Save Review
            </button>
        </form>
    )
};