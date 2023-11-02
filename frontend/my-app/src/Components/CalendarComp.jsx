import React, {useEffect, useState} from "react";
import 'react-calendar/dist/Calendar.css';
import Time from "./Time.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import CalendarBox from "./CalendarBox.jsx";
import SubmitOrDeleteButton from "./SubmitOrDeleteButton.jsx";
import SelectedDateInfo from "./SelectedDateInfo.jsx";
import SetTextAppointment from "./SetTextAppointment.jsx";
import UserContext from "../Pages/UserContext.jsx";
import Header from "./Header.jsx";

const fetchAppointmentForUser = (id) => {
    const token = localStorage.getItem('jwtToken');
    console.log("TOKEN IN CALENDAR COMP. fetchAppointmentForUser: ", token)
    return fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    });
};

const fetchAppointmentsForDay = (year, month, day) => {
    const token = localStorage.getItem('jwtToken');
    console.log("TOKEN IN CALENDAR COMP. fetchAppointmentsForDay: ", token)
    return fetch(`/api/appointments/allforday?year=${year}&month=${month}&day=${day}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return res.json();
        });
};

const createAppointment = async (time, id) => {
    const token = localStorage.getItem('jwtToken');
    console.log("TOKEN IN CALENDAR COMP. createAppointment: ", token)
    const requestBody = {
        userId: id,
        appointment: time
    };

    const response = await fetch("/api/appointments/create", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
        throw new Error("Failed to create an appointment.");
    }

    return response.json();
};

const filterDates = (currentDate, date) => {
    return currentDate > date || date.getDay() === 0 || date.getDay() === 6;
};

function getDisabledTiles() {
    return ({date}) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        return filterDates(currentDate, date);
    };
}

function getOnClickDay(handleSelectedDay, date, setShowTime) {
    return () => {
        handleSelectedDay(date);
        setShowTime(true);
    };
}

const CalendarComp = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false);
    const [userBookedAppointment, setUserBookedAppointment] = useState(null);
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [info, setInfo] = useState(false);
    const { user, setUser } = React.useContext(UserContext);
   // const [user, setUser] = useState(null);
    const [bookedAppointments, setBookAppointments] = useState([]);

    useEffect(() => {
        // TODO: Check this double fetch and its error handling with mentor (refactored)
        const fetchData = async () => {
            try {
                const {name, email, password, appointmentDTO} = await fetchAppointmentForUser(id);
                setUser({name, email, password, appointmentDTO});
                if (appointmentDTO) {
                    setUserBookedAppointment(appointmentDTO.appointment);
                }
                const bookedAppointments = await fetchAppointmentsForDay(
                    date.getFullYear(),
                    date.getMonth() + 1,
                    date.getDate()
                );
                setBookAppointments(bookedAppointments);
            } catch (error) {
                console.error(error);
                return alert("Invalid user!");
            }
        };
        fetchData();
    }, [date, id]);

    const handleSelectedDay = (selectedDay) => {
        setSelectedDay(selectedDay);
    }
    const handleSelectedTime = (selectedTime) => {
        setSelectedTime(selectedTime);
    }

    return (
        <div className="outerContainer">
            <Header/>
        <div className="calendar">
            <h3 className="header">Reserve an appointment</h3>
            <div className="flexboxCalendar">
                <CalendarBox
                    onChange={setDate}
                    value={date}
                    onClickDay={getOnClickDay(handleSelectedDay, date, setShowTime)}
                    tileDisabled={getDisabledTiles()}
                />
                <div className="showTime">
                    <Time
                        showTime={showTime}
                        date={date}
                        bookedAppointments={bookedAppointments}
                        handleSelectedTime={handleSelectedTime}
                        info={info}
                        setInfo={setInfo}
                        isSubmitted={isSubmitted}
                    />
                </div>
            </div>

            <div className="flexboxTime">
                <SelectedDateInfo date={date}/>
                <SetTextAppointment info={info} selectedTime={selectedTime}/>
                <SubmitOrDeleteButton info={info} onClick={async () => {
                    setIsSubmitted(!isSubmitted);
                    date.setHours(6, 0, 0, 0);
                    let isoFormatTime = date.toISOString().substring(0, 11) + selectedTime + ":00";
                    try {
                        // TODO: Check this await whether it works correctly
                        await createAppointment(isoFormatTime, id);
                        navigate(`/user/${id}`);
                    } catch (error) {
                        console.error("Error creating appointment:", error);
                    }
                }} submitted={isSubmitted}/>
                <div>
                <Link to={`/user/${id}`}>
                    <button className='backButton' type="button">BACK</button>
                </Link>
                </div>
            </div>
        </div>


        </div>
    );
};

export default CalendarComp;
