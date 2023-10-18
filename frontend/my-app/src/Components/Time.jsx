import Times from "./Times.jsx";

function Time({showTime, date, bookedAppointments, handleSelectedTime, info, setInfo, isSubmitted, user}) {
    return (
        <div>
            {showTime ? <Times
                date={date}
                bookedAppointments={bookedAppointments}
                handleSelectedTime={handleSelectedTime}
                info={info}
                setInfo={setInfo}
                isSubmitted={isSubmitted}
                user={user}
            /> : null}
        </div>
    )
}

export default Time;