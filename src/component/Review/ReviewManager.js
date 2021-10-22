// fetech calls from API to get different info from the database
const remoteURL = "http://localhost:8088"
//
export const getReviewById = (reviewId) => {
    return fetch(`${remoteURL}/reviews/${reviewId}?_expand=hospital&_expand=user`)
        .then(res => res.json())

}

export const getAllReviews = () => {
    return fetch(`${remoteURL}/reviews?_expand=hospital&_expand=user`)
        .then(res => res.json())
}

export const deleteReview = (id) => {
    return fetch(`${remoteURL}/reviews/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
}


export const addReview = (newReview) => {
    return fetch(`${remoteURL}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newReview)
    }).then(response => response.json())
}

export const update = (editedReview) => {
    return fetch(`${remoteURL}/reviews/${editedReview.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedReview)
    }).then(data => data.json());
}