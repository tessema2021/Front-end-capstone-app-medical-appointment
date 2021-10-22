import React, { useEffect, useState } from 'react';
import { getAllChildren, deletechild } from "./ChildManager"
import { ChildCard } from './ChildCard';
import { useHistory } from 'react-router';
import "./ChildList.css"


export const ChildrenList = () => {

    const [child, setChildren] = useState([]);
    const history = useHistory();

    const getChildren = () => {
        return getAllChildren().then(childrenFromAPI => {
            // We'll do something more interesting with this data soon.
            console.log(childrenFromAPI);
            setChildren(childrenFromAPI);
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
