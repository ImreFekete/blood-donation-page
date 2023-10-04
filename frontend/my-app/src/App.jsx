import './App.css'
import {useEffect, useState} from "react";
import CalendarComp from "./Components/CalendarComp.jsx";

const fetchAppointmentsForDay = (id) => {
    console.log("id", id);
    return fetch(`/appointments/allforday/${id}`).then((res) => {
        console.log("resbody", res.body);
        console.log("res", res);
        return res.json()});
}

function App() {
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [selectedDay, setSelectedDay] = useState(new Date());
    console.log("Day", selectedDay);

    useEffect(() => {
        fetchAppointmentsForDay(selectedDay)
            .then((bookedAppointments) => {
                console.log("booked", bookedAppointments);
                setBookedAppointments(bookedAppointments);
            })
    }, [selectedDay]);

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
                />
            </div>
        </>
    )
}

export default App
