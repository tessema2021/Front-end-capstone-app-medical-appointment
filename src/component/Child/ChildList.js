import React, { useEffect, useState } from 'react';
import { getAllChildren, deletechild } from "./ChildManager"
import { ChildCard } from './ChildCard';
import { useHistory } from 'react-router';
import "./ChildList.css"


export const ChildrenList = () => {

    const [child, setChildren] = useState([]);
    const history = useHistory();
    const loggedInUser = JSON.parse(sessionStorage.getItem("medical_appointment_user"))
    const getChildren = () => {
        return getAllChildren(loggedInUser.id).then(childrenFromAPI => {
            // We'll do something more interesting with this data soon.
            const sortedActivities = childrenFromAPI.sort((a, b) => new Date(a.date) - new Date(b.date))
            setChildren(sortedActivities);

        });
    };


    const handleDeleteChildren = id => {
        deletechild(id)
            .then(() => getAllChildren().then(setChildren));
    };




    useEffect(() => {
        getChildren();
    }, []);

    return (
        <>

            <section className="section-content">
                <button type="button"
                    className="add-btn"
                    onClick={() => { history.push("/children/create") }}>
                    Add Child
                </button>
            </section>

            <div className="container-cards">
                {child.map(children => <ChildCard children={children} key={children.id} handleDeleteChildren={handleDeleteChildren} />)}
            </div>
        </>
    );
};
