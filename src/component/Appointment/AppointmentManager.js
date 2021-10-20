// fetech calls from API to get different info from the database
const remoteURL = "http://localhost:8088"
//
export const getAppointmentById = (appointmentId) => {
    return fetch(`${remoteURL}/appointments/${appointmentId}?_expand=child&_expand=hospital`)
        .then(res => res.json())

}

export const getAllAppointments = () => {
    return fetch(`${remoteURL}/appointments?_expand=child&_expand=hospital`)
        .then(res => res.json())
}

export const deleteAppointment = (id) => {
    return fetch(`${remoteURL}/appointments/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
}


export const addAppointment = (newAppointment) => {
    return fetch(`${remoteURL}/appointments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newAppointment)
    }).then(response => response.json())
}

export const update = (editedAppointment) => {
    return fetch(`${remoteURL}/appointments/${editedAppointment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedAppointment)
    }).then(data => data.json());
}