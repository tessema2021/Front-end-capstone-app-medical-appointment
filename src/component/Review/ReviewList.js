import React, { useEffect, useState } from 'react';
import { getAllReviews, deleteReview } from "./ReviewManager"
import { ReviewCard } from './ReviewCard';
import { useHistory } from 'react-router';
import "./ReviewList.css"

export const ReviewList = () => {

    const [reviews, setReviews] = useState([]);
    const history = useHistory();

    const getReviews = () => {
        return getAllReviews().then(reviewsFromAPI => {
            // We'll do something more interesting with this data soon.
            console.log(reviewsFromAPI);
            setReviews(reviewsFromAPI);
        });
    };


    const handleDeleteReview = id => {
        deleteReview(id)
            .then(() => getAllReviews().then(setReviews));
    };




    useEffect(() => {
        getReviews();
    }, []);

    return (
        <>

            <section className="section-content">
                <button type="button"
                    className="add-btn"
                    onClick={() => { history.push("/reviews/create") }}>
                    Add Review
                </button>
            </section>

            <div className="container-cards">
                {reviews.map(review => <ReviewCard key={review.id} review={review} handleDeleteReview={handleDeleteReview} />)}
            </div>
        </>
    );
};