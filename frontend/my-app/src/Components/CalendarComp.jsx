import {useEffect, useState} from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Time from "./Time.jsx";
import {Link} from "react-router-dom";

const filterWeekends = (date) => {
    return date.getDay() === 0 || date.getDay() === 6;
}

const filterPastDates = (currentDate, date) => {
    return currentDate > date;
}

const fetchAppointmentsForDay = (id) => {
    return fetch(`/api/appointments/allforday/${id}`).then((res) => {
        return res.json()
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
    return fetch(`/api/appointments/${id}`, {method: "DELETE"}).then((res) =>
        res.json()
    );
}

const CalendarComp = () => {
    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false);
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [info, setInfo] = useState(false);

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
    const handleSeledtedTime = (selectedTime) => {
        setSelectedTime(selectedTime);
    }

    return (
        <div className="calendar">
            <h2 className="header">IMF Blood Calendar</h2>

            <div className="flexboxCalendar">
                <div className="calendarBox"> {/*NAPTÁR*/}
                    <Calendar
                        onChange={setDate}
                        value={date}
                        onClickDay={() => {
                            //handleSelectedDay(date);
                            setShowTime(true)
                        }}
                        tileDisabled={({date}) => {
                            const currentDate = new Date();
                            currentDate.setHours(0, 0, 0, 0);
                            return filterPastDates(currentDate, date) || filterWeekends(date);
                        }}
                    />
                </div>

                <div className="showTime">
                    <Time
                        showTime={showTime}
                        date={date}
                        bookedAppointments={bookedAppointments}
                        handleSelectedTime={handleSeledtedTime}
                        info={info}
                        setInfo={setInfo}
                        isSubmitted={isSubmitted}
                    />
                </div>
            </div>

            <div className="flexboxTime">
                {date.length > 0 ? (
                    <p>
                        <span>Start:</span>
                        {date[0].toDateString()}
                        &nbsp;
                        &nbsp;
                        <span>End:</span>{date[1].toDateString()}
                    </p>
                ) : (
                    <p className="textSelectedDate">
                        <span>Selected date: </span>{date.toDateString()}.
                    </p>
                )}

                <div className="textAppointmentSet">
                    {info ? `Your appointment is set to ${selectedTime}.` : null}
                </div>

                <div className="submitOrDeleteButton">
                    {info ?
                        (!isSubmitted ?
                                (<button type="submit" onClick={() => {
                                        setIsSubmitted(true);
                                        const isoFormatTime = bookedAppointments[0].appointment.substring(0, 11) + selectedTime + ":00";
                                        return createAppointment(isoFormatTime)
                                    }}>
                                        SUBMIT
                                    </button>
                                )
                                :
                                (<button type="submit" onClick={() => {
                                        setIsSubmitted(false);
                                        const isoFormatTime = bookedAppointments[0].appointment.substring(0, 11) + selectedTime + ":00";
                                        return deleteAppointment(isoFormatTime)
                                    }}>
                                        DELETE
                                    </button>
                                )
                        )
                        :
                        null
                    }
                </div>
            </div>

            <Link to="/">
                <button className='backButton' type="button">BACK</button>
            </Link>

        </div>
    );
};

export default CalendarComp;