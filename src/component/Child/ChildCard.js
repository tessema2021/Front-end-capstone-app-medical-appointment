
import React from "react"
//import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export const ChildCard = ({ children, handleDeleteChildren }) => {

    const history = useHistory();
    // changes the date human readable format
    // const getReadableDate = (date) => {
    //     return new Date(date).toLocaleDateString();

    return (

        <section className="child">
            <h3 className="child__name">{children.firstName} {children.lastName}</h3>
            <div className="event__location">{children.dateOfBirth}</div>
            {/* <div className="event__date">{getReadableDate(event.date)}</div>
            <button type="button" onClick={() => handleDeleteEvent(event.id)}>Delete</button> */}
            {/* <Link to={`/events/${event.id}`}>
                <button className="details-button-event">Details</button>
            </Link> */}
            <button className="edit-button-children" type="button"
                onClick={() => history.push(`/children/edit/${children.id}`)}>
                Edit
            </button>
            <button type="button" onClick={() => handleDeleteChildren(children.id)}>Delete</button>
        </section>
    )
}
