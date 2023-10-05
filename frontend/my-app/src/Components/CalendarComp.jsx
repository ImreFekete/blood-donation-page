import {useEffect, useState} from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Time from "./Time.jsx";
import {Link} from "react-router-dom";

function filterWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
}

const fetchAppointmentsForDay = (id) => {
    return fetch(`/api/appointments/allforday/${id}`).then((res) => {
        return res.json()
    });
}

function filterPastDates(currentDate, date) {
    return currentDate > date;
}

const CalendarComp = () => {
    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false);
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [selectedDay, setSelectedDay] = useState(new Date());

    useEffect(() => {
        fetchAppointmentsForDay("fetch") // HARD CODED VALUE ONLY FOR TESTING PURPOSE
            .then((bookedAppointments) => {
                console.log(bookedAppointments);
                setBookedAppointments(bookedAppointments);
            })
    }, []);

    const handleSelectedDay = (selectedDay) => {
        setSelectedDay(selectedDay);
    }

    return (
        <div className="calendar">
            <h2 className="header">IMF Blood Calendar</h2>
            <div className="flexboxCalendar">
                <div>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        onClickDay={() => {
                            handleSelectedDay(date);
                            setShowTime(true)
                        }}
                        tileDisabled={({date}) => {
                            const currentDate = new Date();
                            currentDate.setHours(0, 0, 0, 0);
                            return filterPastDates(currentDate, date) || filterWeekends(date);
                        }}
                    />
                </div>
                <div>
                    <Time
                        showTime={showTime}
                        date={date}
                        bookedAppointments={bookedAppointments}
                    />
                </div>
            </div>
            {date.length > 0 ? (
                <p>
                    <span>Start:</span>
                    {date[0].toDateString()}
                    &nbsp;
                    &nbsp;
                    <span>End:</span>{date[1].toDateString()}
                </p>
            ) : (
                <p>
                    <span>Default selected date:</span>{date.toDateString()}
                </p>
            )}
            <Link to="/">
                <button className='backButton' type="button">BACK</button>
            </Link>
        </div>
    );
};

export default CalendarComp;