import Times from "./Times.jsx";

function Time({showTime, date, bookedAppointments}) {
    console.log(showTime);
    console.log(date);

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