import Times from "./Times.jsx";

function Time({showTime, date, bookedAppointments, handleSelectedTime, info, setInfo, isSubmitted}) {
    return (
        <div>
            {showTime ? <Times
                date={date}
                bookedAppointments={bookedAppointments}
                handleSelectedTime={handleSelectedTime}
                info={info}
                setInfo={setInfo}
                isSubmitted={isSubmitted}
            /> : null}
        </div>
    )
}

export default Time;