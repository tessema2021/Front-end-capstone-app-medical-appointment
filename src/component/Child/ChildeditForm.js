import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getChildById } from "./ChildManager";
import { update } from "./ChildManager"




export const ChildrenEditForm = () => {
    const [children, setChildren] = useState({ firstName: "", lastName: "", dateOfBirth: "" });
    const [isLoading, setIsLoading] = useState(false);
    // "isLoading" is showing user data is being loaded but is not fully loaded yet
    const { childrenId } = useParams();
    // useParams lets you access parameters of current <route>
    const history = useHistory();
    // useHistory all the URL visited on DOM
    const handleFieldChange = evt => {
        const stateToChange = { ...children };
        stateToChange[evt.target.id] = evt.target.value;
        setChildren(stateToChange);
    };
    // preventDefault---you dont want HTML to handle your code by default
    const updateExistingChildren = evt => {
        evt.preventDefault()
        setIsLoading(true);

        // This is an edit, so we need the id
        const editedChildren = {
            id: childrenId,
            firstName: children.firstName,
            lastName: children.lastName,
            dateOfBirth: children.dateOfBirth
        };
        console.log(editedChildren)
        update(editedChildren)
            .then(() => history.push("/")
                // history.push pushes this URL onto all the history in the DOM
            )
    }
    // useEffect tells react component it needs to do something after rendering
    useEffect(() => {
        getChildById(childrenId)
            .then(children => {
                setChildren(children);
                setIsLoading(false);
            });
    }, [childrenId]);

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
                            id="name"
                            value={children.firstName}
                        />
                        <label htmlFor="title">Child First Name</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="name"
                            value={children.lastName}
                        />
                        <label htmlFor="title">Child Last Name</label>

                        <input
                            type="date"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="date"
                            value={children.dateOfBirth}
                        />
                        <label htmlFor="date">Date Of Birth</label>

                    </div>
                    <div className="alignRight">
                        <button
                            type="button"
                            onClick={updateExistingChildren}
                            className="btn btn-primary"
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
    );
}