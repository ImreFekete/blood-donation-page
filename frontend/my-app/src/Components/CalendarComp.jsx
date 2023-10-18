import {useEffect, useState} from "react";
import 'react-calendar/dist/Calendar.css';
import Time from "./Time.jsx";
import {Link, useParams} from "react-router-dom";
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

const createAppointment = (time) => {
    const requestBody = {appointment: time};
    return fetch("/api/appointments/allforday", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    }).then((res) => res.json());
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
    const {id} = useParams();
    console.log("ID IN CALENDAR COMP.: ", id);

    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false);
    const [userBookedAppointment, setUserBookedAppointment] = useState(null);
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [info, setInfo] = useState(false);
    const [user, setUser] = useState(null);
    const [bookedAppointments, setBookAppointments] = useState([]);

    console.log("BOOKED APP.:", userBookedAppointment);

    useEffect(() => {
        // TODO: Check double fetch order
        fetchAppointmentForUser(id)
            .then(({email, password, appointmentDTO}) => {
                setUser({email, password, appointmentDTO});
                setUserBookedAppointment(appointmentDTO.appointment);
            })
            .then(() =>
                fetchAppointmentsForDay(date.getFullYear(), date.getMonth() + 1, date.getDate())
                    .then((bookedAppointments) => {
                            console.log("BOOKED APPOINTMENTS", bookedAppointments);
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
                    />
                </div>
            </div>

            <div className="flexboxTime">
                <SelectedDateInfo date={date}/>
                <SetTextAppointment info={info} selectedTime={selectedTime}/>
                <SubmitOrDeleteButton info={info} onClick={() => {
                    setIsSubmitted(!isSubmitted);
                    const isoFormatTime = userBookedAppointment[0].appointment.substring(0, 11) + selectedTime + ":00";
                    return !isSubmitted ? createAppointment(isoFormatTime) : deleteAppointment(isoFormatTime);
                }} submitted={isSubmitted}/>
            </div>

            <Link to="/">
                <button className='backButton' type="button">BACK</button>
            </Link>
        </div>
    );
};

export default CalendarComp;