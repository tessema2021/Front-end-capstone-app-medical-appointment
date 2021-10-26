import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getReviewById } from "./ReviewManager"
import { update } from "./ReviewManager"
import { getAllHospitals } from '../Hospital/HospitalManager';

export const ReviewEditForm = () => {
    const [review, setReview] = useState({
        hospitalId: "",
        howEasyWasToScheduleAppointment: "",
        howLongDidYouWait: "",
        howSatisfiedAreYou: "",
        howWouldYouRateTheOverAllCare1to10: "",
        date: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    // "isLoading" is showing user data is being loaded but is not fully loaded yet
    const { reviewId } = useParams();
    // useParams lets you access parameters of current <route>

    const [hospitals, setHospitals] = useState([]);
    const history = useHistory();
    // useHistory all the URL visited on DOM
    const handleFieldChange = evt => {
        const stateToChange = { ...review };
        stateToChange[evt.target.id] = evt.target.value;
        setReview(stateToChange);
    };
    // preventDefault---you dont want HTML to handle your code by default
    const updateExistingReview = evt => {
        evt.preventDefault()
        setIsLoading(true);

        // This is an edit, so we need the id
        const editedReview = {
            userId: JSON.parse(sessionStorage.getItem("medical_appointment_user")).id,
            id: reviewId,
            hospitalId: review.hospitalId,
            howEasyWasToScheduleAppointment: review.howEasyWasToScheduleAppointment,
            howLongDidYouWait: review.howLongDidYouWait,
            howSatisfiedAreYou: review.howSatisfiedAreYou,
            howWouldYouRateTheOverAllCare1to10: review.howWouldYouRateTheOverAllCare1to10,
            date: review.date

        };
        console.log(editedReview)
        update(editedReview)
            .then(() => history.push("/")
                // history.push pushes this URL onto all the history in the DOM
            )
    }
    useEffect(() => {
        //load hospital data and setState
        getAllHospitals().then(hospitals => {
            setHospitals(hospitals)
        })
    }, []);


    // useEffect tells react component it needs to do something after rendering
    useEffect(() => {
        getReviewById(reviewId)
            .then(review => {
                setReview(review);
                setIsLoading(false);
            });
    }, [reviewId]);

    return (
        <>
            <form>
                <fieldset>
                    <div className="formgrid">
                        <label htmlFor="hospital">Hospital: </label>
                        <select value={review.hospitalId} name="hospitalId" id="hospitalId" onChange={handleFieldChange}
                            className="form-control" >
                            <option value="0">Select Hospital</option>
                            {hospitals.map(l => (
                                <option key={l.id} value={l.id}>
                                    {l.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="howEasyWasToScheduleAppointment"
                            value={review.howEasyWasToScheduleAppointment}
                        />
                        <label htmlFor="howEasyWasToScheduleAppointment">How easy was to schedule appointment</label>

                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="howLongDidYouWait"
                            value={review.howLongDidYouWait}
                        />
                        <label htmlFor="howLongDidYouWait">How long did you wait</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="howSatisfiedAreYou"
                            value={review.howSatisfiedAreYou}
                        />
                        <label htmlFor="howSatisfiedAreYou">How satisfied are you</label>
                        <input
                            type="number"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="howWouldYouRateTheOverAllCare1to10"
                            value={review.howWouldYouRateTheOverAllCare1to10}
                        />
                        <label htmlFor="howWouldYouRateTheOverAllCare1 - 10">How would you rate the over all care 1 to 10</label>

                    </div>
                    <div className="alignRight">
                        <button
                            type="button"
                            onClick={updateExistingReview}
                            className="btn btn-primary"
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
    );
}