import Times from "./Times.jsx";

function Time({showTime, date, bookedAppointments,handleSelectedTime}) {
    return (
        <div>
            {showTime ? <Times
                date={date}
                bookedAppointments = {bookedAppointments}
                handleSelectedTime = {handleSelectedTime}
            /> : null}
        </div>
    )
}

export default Time;