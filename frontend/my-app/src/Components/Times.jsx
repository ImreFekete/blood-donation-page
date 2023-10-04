import {useState} from 'react';

const times = ['08:30', '09:00', '09:30','10:00', '10:30',
    '11:00', '11:30', '12:00','12:30', '13:00',
    '13:30', '14:00','14:30', '15:00'];

function Times({showTime, date, bookedAppointments}) {

    const bookedTimes = bookedAppointments.map(item => {
        return item.appointment.substring(11, 16);
    });

    console.log("bookedTimes", bookedTimes);

    const availableTimes = times.filter(time => !bookedTimes.includes(time));
    console.log("available", availableTimes);


    const [event, setEvent] = useState(null);
    const [info, setInfo] = useState(false);

    function displayInfo(e) {
        setInfo(true);
        setEvent(e.target.innerText);
    }

    return (
        <div className="times">
            {availableTimes.map(time => {
                return (
                    <div key={time}>
                        <button onClick={(e) => displayInfo(e)}> {time} </button>
                    </div>
                )
            })}
            <div>
                {info ? `Your appointment is set to ${event} ${date.toDateString()}` : null}
            </div>
        </div>
    )
}

export default Times;