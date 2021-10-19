// fetech calls from API to get different info from the database
const remoteURL = "http://localhost:8088"
//
export const getChildrenById = (childrenId) => {
    return fetch(`${remoteURL}/childrens/${childrenId}`)
        .then(res => res.json())

}

export const getAllChidren = () => {
    return fetch(`${remoteURL}/childrens`)
        .then(res => res.json())
}

export const deletechildren = (id) => {
    return fetch(`${remoteURL}/childrens/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
}


export const addChildren = (newchildren) => {
    return fetch(`${remoteURL}/childrens`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newchildren)
    }).then(response => response.json())
}

export const update = (editedChildren) => {
    return fetch(`${remoteURL}/childrens/${editedChild.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedChildren)
    }).then(data => data.json());
}