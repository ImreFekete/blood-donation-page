import Times from "./Times.jsx";

function Time({showTime, date, bookedAppointments}) {
    return (
        <div>
            {showTime ? <Times
                date={date}
                bookedAppointments = {bookedAppointments}
            /> : null}
        </div>
    )
}

export default Time;