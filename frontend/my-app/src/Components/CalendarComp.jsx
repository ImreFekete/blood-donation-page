import {useEffect, useState} from "react";
import 'react-calendar/dist/Calendar.css';
import Time from "./Time.jsx";
import {Link, useParams} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import CalendarBox from "./CalendarBox.jsx";
import SubmitOrDeleteButton from "./SubmitOrDeleteButton.jsx";
import SelectedDateInfo from "./SelectedDateInfo.jsx";
import SetTextAppointment from "./SetTextAppointment.jsx";

const fetchAppointmentForUser = (id) => {
    return fetch(`/api/users/${id}`).then((res) => {
        return res.json();
    });
}

const fetchAppointmentsForDay = (year, month, day) => {
    return fetch(`/api/appointments/allforday?year=${year}&month=${month}&day=${day}`).then((res) => {
        return res.json();
    });
}

const createAppointment = async (time, id) => {
    console.log("TIME IN CREATE", time);
    console.log("ID IN CREATE", id);
    const requestBody = {
        userId: id,
        appointment: time
    };

    const response = await fetch("/api/appointments/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
        throw new Error("Failed to create an appointment.");
    }

    return response.json();
}

const deleteAppointment = (id) => {
    return fetch(`/api/appointments/${id}`, {method: "DELETE"}).then((res) => res.json());
}

const filterDates = (currentDate, date) => {
    return currentDate > date || date.getDay() === 0 || date.getDay() === 6;
}

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
    const [user, setUser] = useState(null);
    const [bookedAppointments, setBookAppointments] = useState([]);

    console.log("USER:", user);

    useEffect(() => {
        // TODO: Check double fetch order
        fetchAppointmentForUser(id)
            .then(({email, password, appointmentDTO}) => {
                setUser({email, password, appointmentDTO});
                if (appointmentDTO) {
                    setUserBookedAppointment(appointmentDTO.appointment);
                }
            })
            .then(() =>
                fetchAppointmentsForDay(date.getFullYear(), date.getMonth() + 1, date.getDate())
                    .then((bookedAppointments) => {
                            setBookAppointments(bookedAppointments);
                        }
                    ))
    }, [date, id]);

    const handleSelectedDay = (selectedDay) => {
        setSelectedDay(selectedDay);
    }
    const handleSelectedTime = (selectedTime) => {
        setSelectedTime(selectedTime);
    }

    return (
        <div className="calendar">
            <h2 className="header">IMF Blood Calendar</h2>
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
                        user={user}
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
                        // return !isSubmitted ? createAppointment(isoFormatTime, id) : deleteAppointment(isoFormatTime);
                        try {
                            // TODO: Fix this mess...Create is faster than the fetch on the navigate page...
                            const appointment = await createAppointment(isoFormatTime, id);
                            navigate(`/user/${id}`, { state: { appointment: appointment } });
                        } catch (error) {
                            console.error("Error creating appointment:", error);
                        }
                    }} submitted={isSubmitted}/>
            </div>

            <Link to="/">
                <button className='backButton' type="button">BACK</button>
            </Link>
        </div>
    );
};

export default CalendarComp;