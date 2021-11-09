import React from "react";
import { useHistory } from "react-router";
import "./ReviewCard.css"


export const ReviewCard = ({ review, handleDeleteReview }) => {
    const history = useHistory();
    // allows the timestamp to be put into a human readable format
    const getReadableDate = (date) => {

        console.log("date", date)

        const FormatedDate = new Date(date + "T12:00:00"
        ).toLocaleDateString();
        console.log("formated date", FormatedDate)
        return FormatedDate;
    }
    const loggedInUser = JSON.parse(sessionStorage.getItem("medical_appointment_user"))

    if (review.userId === loggedInUser.id) {

        return (
            <div className="review_card">
                <p className="review_name">Name of Hospital: {review.hospital.name} </p>
                <p className="review_easy">How easy was to schedule appointment: {review.howEasyWasToScheduleAppointment} </p>
                <p className="review_wait">How long did you wait: {review.howLongDidYouWait} </p>
                <p className="review_satisfaction">How satisfied are you: {review.howSatisfiedAreYou} </p>
                <p className="review_score"> How would you rate the over all care 1 to 10:{review.howWouldYouRateTheOverAllCare1to10} </p>
                <div className="review_date">Date {getReadableDate(review.date)}</div>

                <button className="button-edit" type="button"
                    onClick={() => history.push(`/reviews/${review.id}/edit`)}>
                    Edit
                </button>
                <button className="button-delete" type="button" onClick={() => handleDeleteReview(review.id)}>Delete</button>

            </div>
        )
    } else {
        return (
            <div className="review_card">
                <p className="review_schedule">Name of Hospital: {review.hospital.name} </p>
                <p className="review_schedule">How easy was to schedule appointment: {review.howEasyWasToScheduleAppointment} </p>
                <p className="review_schedule">How long did you wait: {review.howLongDidYouWait} </p>
                <p className="review_schedule">How satisfied are you: {review.howSatisfiedAreYou} </p>
                <p className="review_schedule"> How would you rate the over all care 1 to 10:{review.howWouldYouRateTheOverAllCare1to10} </p>
                <div className="review_date">Date {getReadableDate(review.date)}</div>
            </div>
        )

    }
}
