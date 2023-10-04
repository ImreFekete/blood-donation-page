import {useState} from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Time from "./Time.jsx";

function filterWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
}

const CalendarComp = ({handleSelectedDay, bookedAppointments}) => {

    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false);

    return (
        <div className="calendar">
            <h1 className="header">IMF Blood Calendar</h1>
            <div>
                <Calendar
                    onChange={setDate}
                    value={date}
                    onClickDay={() => {
                        handleSelectedDay(date);
                        setShowTime(true)}}
                    tileDisabled={({ date}) => {
                        const currentDate = new Date();
                        currentDate.setHours(0, 0, 0, 0);
                        return currentDate > date || filterWeekends(date);
                    }}
                />
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
            )
            }
            <Time
                showTime={showTime}
                date={date}
                bookedAppointments = {bookedAppointments}
            />
        </div>
    );
};

export default CalendarComp;