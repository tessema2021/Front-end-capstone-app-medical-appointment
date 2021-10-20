// fetech calls from API to get different info from the database
const remoteURL = "http://localhost:8088"
//
export const getChildById = (childId) => {
    return fetch(`${remoteURL}/children/${childId}`)
        .then(res => res.json())

}

export const getAllChildren = () => {
    return fetch(`${remoteURL}/children`)
        .then(res => res.json())
}

export const deletechild = (id) => {
    return fetch(`${remoteURL}/children/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
}


export const addChild = (newchild) => {
    return fetch(`${remoteURL}/children`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newchild)
    }).then(response => response.json())
}

export const update = (editedChild) => {
    return fetch(`${remoteURL}/childrens/${editedChild.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedChild)
    }).then(data => data.json());
}