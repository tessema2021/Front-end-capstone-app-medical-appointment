import React, { useEffect, useState } from 'react';
import { getAllAppointments, deleteAppointment } from "./AppointmentManager"
import { AppointmentCard } from './AppointmentCard';
import { useHistory } from 'react-router';
import "./AppointmentList.css"
import { FirstAppointmentCard } from './FirstAppointmentCard';

export const AppointmentList = () => {

    const [appointments, setAppointments] = useState([]);
    const history = useHistory();
    const loggedInUser = JSON.parse(sessionStorage.getItem("medical_appointment_user"))

    const getAppointments = () => {
        // After the data comes back from the API, we
        //     //  use the setArticles function to update state
        return getAllAppointments(loggedInUser.id).then(appointmentsFromAPI => {
            // We'll do something more interesting with this data soon.
            const sortedActivities = appointmentsFromAPI.sort((a, b) => new Date(a.date) - new Date(b.date))
            setAppointments(sortedActivities);
        });
    };
    const [filteredPast, setFilteredPastAppointments] = useState([]);
    const [filteredFuture, setFilteredFutureAppointments] = useState([]);

    useEffect(() => {
        // filters past appointment in the datebase
        const pastAppointments = appointments.filter(appointment => {
            return new Date(appointment.date + "T00:00:00").getTime() < new Date().getTime();

        });
        setFilteredPastAppointments(pastAppointments);
        //filters future appointment in the database
        const futureAppointments = appointments.filter(appointment => {

            return new Date(appointment.date + "T00:00:00").getTime() >= new Date().getTime();
        });
        setFilteredFutureAppointments(futureAppointments);

    }, [appointments]);

    const handleDeleteAppointment = id => {
        deleteAppointment(id)
            .then(() => getAllAppointments().then(setAppointments));
    };




    useEffect(() => {
        getAppointments();
    }, []);

    return (
        <>

            <section className="section-content">
                <button type="button"
                    className="add-btn"
                    onClick={() => { history.push("/appointments/create") }}>
                    Add Appointment
                </button>
            </section>

            <div className="container-cards">
                {filteredFuture.map(appointment => {
                    console.log(filteredFuture)
                    if (filteredFuture.indexOf(appointment) !== 0) {
                        return <AppointmentCard key={appointment.id} appointment={appointment} handleDeleteEvent={handleDeleteAppointment} />
                    } else {
                        return <FirstAppointmentCard key={appointment.id} appointment={appointment} handleDeleteAppointment={handleDeleteAppointment} />
                    }
                })
                }
                {filteredPast.map(appointment => <AppointmentCard key={appointment.id} appointment={appointment} handleDeleteAppointment={handleDeleteAppointment} />)}
            </div>
        </>
    );
};

//{rounds.filter(round => round.userId === user).map(round => <RoundCard round={round} key={round.id} handleDeleteRound={handleDeleteRound} />)}see
// export const AppointmentList = () => {
//     // The initial state is an empty array
//     const [remainingAppointments, setRemainingAppointments] = useState([]);
//     const [firstUpcomingAppointment, setFirstUpcomingAppointment] = useState({})
//     const [futureAppointments, setFutureAppointments] = useState([])
//     const [pastAppointments, setPastAppointments] = useState([])

//     // grabs all appointmentss from API, makes a copy, filters through each event and returns array of the objects dated after today
//     const getFutureAppointments = () => {
//         const today = new Date();
//         const parsedToday = today.getTime()
//         return getAllAppointments().then(appointmentsFromAPI => {
//             const copyOfAppointments = [...appointmentsFromAPI]
//             const futureDatedAppointments = copyOfAppointments.filter(function (evt) {
//                 let evtDate = Date.parse(evt.date);
//                 if (evtDate > parsedToday) {
//                     return evt
//                 }
//             })
//             setFutureAppointments(futureDatedAppointments);
//         });
//     };

//     // grabs all appointments from API, makes a copy, filters through each event and returns array of the objects dated before today
//     const getPastAppointments = () => {
//         const today = new Date();
//         const parsedToday = today.getTime()
//         return getAllAppointments().then(appointmentsFromAPI => {
//             const copyOfAppointments = [...appointmentsFromAPI]
//             const pastDatedAppointments = copyOfAppointments.filter(function (evt) {
//                 let evtDate = Date.parse(evt.date);
//                 if (evtDate < parsedToday) {
//                     return evt
//                 }
//             })
//             pastDatedAppointments.reverse() //reverses order of array so most recent appointment is at top of list
//             setPastAppointments(pastDatedAppointments);
//         });
//     };

//     // saves a copy of futureAppointments array from state then grabs the first appointment and sets that to state
//     const showFirstUpcomingAppointment = () => {
//         const copyOfFutureAppointments = [...futureAppointments]
//         const firstAppointmentObj = copyOfFutureAppointments.shift()
//         console.log("firstAppointmentObj is saved as ", firstAppointmentObj)
//         setFirstUpcomingAppointment(firstAppointmentObj)
//     }

//     // saves a copy of futureAppointments array, removes first object and sets remaining Appointments to state as 'appointments'
//     const showRemainingUpcomingAppointments = () => {
//         const copyOfFutureAppointments = [...futureAppointments]
//         copyOfFutureAppointments.shift();
//         const remainingFutureAppointments = copyOfFutureAppointments;
//         setRemainingAppointments(remainingFutureAppointments);
//     }

//     // deletes Appointment when button clicked
//     const handleDeleteAppointment = id => {
//         deleteAppointment(id)
//             .then(() => {
//                 getFutureAppointments()
//                 getPastAppointments()
//                 showFirstUpcomingAppointment()
//                 showRemainingUpcomingAppointments()
//             });
//     }

//     // getFutureAppointments gets all future appointments from API and saves the array to state as 'futureAppointments' on first render only
//     useEffect(() => {
//         getFutureAppointments();
//     }, []);

//     // getPastAppointments gets all past Appointments from API and saves the array to state as 'pastAppointments' on first render only
//     useEffect(() => {
//         getPastAppointments();
//     }, []);

//     // showFirstUpcomingAppointment makes a copy of all futureAppointments, grabs first appointment from array and saves it to state as 'firstUpcomingAppointment' on first render only
//     useEffect(() => {
//         showFirstUpcomingAppointment();
//     }, [futureAppointments]);

//     // showRemainingUpcomingAppointments makes a copy of all futureAppointments, removes first Appointment and saves the rest to state as 'appointments' on first render only
//     useEffect(() => {
//         showRemainingUpcomingAppointments();
//     }, [futureAppointments]);

//     return (

//         <div className="section">

//             <div className="section__header">
//                 Appointments
//             </div>

//             <div className="section__content">
//                 <Link to={`/events/create`}><button className="add__Appointment">+ Add An Appointment</button></Link>
//             </div>

//             <div className="container">

//                 <div className="first__upcoming">
//                     <h2>Upcoming AppointmentS</h2>
//                     {<AppointmentCard
//                         key={firstUpcomingAppointment?.id}
//                         appointment={firstUpcomingAppointment}
//                         card="card__content1"
//                         handleDeleteAppointment={handleDeleteAppointment} />}
//                 </div>

//                 <div className="remaining__upcoming">

//                     {remainingAppointments.map(appointment =>
//                         <AppointmentCard
//                             key={appointment?.id}
//                             appointment={appointment}
//                             card="card__content2"
//                             handleDeleteAppointment={handleDeleteAppointment} />

//                     )}
//                 </div>

//                 <div className="past"><h2>Past AppointmentS</h2>
//                     {pastAppointments.map(appointment =>
//                         <AppointmentCard
//                             key={appointment?.id}
//                             appointment={appointment}
//                             card="card__content2"
//                             handleDeleteAppointment={handleDeleteAppointment} />


//                     )}
//                 </div>

//             </div>

//         </div>
//     );
// };