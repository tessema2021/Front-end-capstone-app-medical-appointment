// fetech calls from API to get different info from the database
const remoteURL = "http://localhost:8088"
//
export const getHospitalById = (hospitalId) => {
    return fetch(`${remoteURL}/hospitals/${hospitalId}`)
        .then(res => res.json())

}

export const getAllHospitals = () => {
    return fetch(`${remoteURL}/hospitals`)
        .then(res => res.json())
}

export const deleteHospital = (id) => {
    return fetch(`${remoteURL}/hospitals/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
}


export const addHospital = (newHospital) => {
    return fetch(`${remoteURL}/hospitals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newHospital)
    }).then(response => response.json())
}

