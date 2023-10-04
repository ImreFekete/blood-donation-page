import './App.css'
import {useEffect, useState} from "react";
import CalendarComp from "./Components/CalendarComp.jsx";

const fetchAppointmentsForDay = (id) => {
    console.log(id);
    return fetch(`/api/appointments/allforday/${id}`).then((res) => {
        console.log(res.body);
        return res.json()
    });
}

function App() {
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [selectedDay, setSelectedDay] = useState(new Date());

    useEffect(() => {
        fetchAppointmentsForDay("fetch")
            .then((bookedAppointments) => {
                console.log(bookedAppointments);
                setBookedAppointments(bookedAppointments);
            })
    }, []);

    const handleSelectDay = (selectedDay) => {
        setSelectedDay(selectedDay);
    }

    return (
        <>
            <div>Main Page</div>
            <button className='reservationButton'>Reserve an appointment
            </button>
            <div>
                <CalendarComp
                     handleSelectedDay={handleSelectDay}
                     bookedAppointments = {bookedAppointments}
                />
            </div>
        </>
    )
}

export default App
