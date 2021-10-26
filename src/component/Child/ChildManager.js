// fetech calls from API to get different info from the database
const remoteURL = "http://localhost:8088"
//
export const getChildById = (childId) => {
    return fetch(`${remoteURL}/children/${childId}?_expand=user`)
        .then(res => res.json())

}

export const getAllChildren = (id) => {
    return fetch(`${remoteURL}/children?_expand=user&userId=${id}`)
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
    return fetch(`${remoteURL}/children/${editedChild.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedChild)
    }).then(data => data.json());
}