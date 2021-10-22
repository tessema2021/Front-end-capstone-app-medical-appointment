
import React from "react"
//import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./ChildCard.css"

export const ChildCard = ({ children, handleDeleteChildren }) => {

    const history = useHistory();
    //changes the date human readable format
    const getReadableDate = (date) => {
        return new Date(date).toLocaleDateString();
    }
    return (

        <section className="child_card">
            <h3 className="child__name">Name {children.firstName} {children.lastName}</h3>
            <div className="child__birth">Date of Birth {getReadableDate(children.dateOfBirth)}</div>
            <button className="button-edit" type="button"
                onClick={() => history.push(`/children/${children.id}/edit`)}>
                Edit
            </button>
            <button className="button-delete" type="button" onClick={() => handleDeleteChildren(children.id)}>Delete</button>
        </section>
    )
}
