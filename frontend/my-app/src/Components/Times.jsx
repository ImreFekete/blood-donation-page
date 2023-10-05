import {useState} from 'react';

const times = ['08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00',
    '13:30', '14:00', '14:30', '15:00'];

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

function Times({showTime, date, bookedAppointments}) {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [info, setInfo] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const bookedTimes = bookedAppointments.map(item => {
        return item.appointment.substring(11, 16);
    });

    const availableTimes = times.filter(time => !bookedTimes.includes(time));

    function displayInfo(e) {
        setInfo(true);
        setSelectedTimeSlot(e.target.innerText);
    }

    return (
        <div className="times">
            <div>
                {!isSubmitted ?
                    (availableTimes.map(time => {
                        return (
                            <div key={time}>
                                <button onClick={(e) => displayInfo(e)}>
                                    {time}
                                </button>
                            </div>
                        )
                    }))
                    :
                    (<div>
                        <button onClick={(e) => displayInfo(e)}>
                            {selectedTimeSlot}
                        </button>
                    </div>)
                }
            </div>

            <div>
                {info ? `Your appointment is set to ${selectedTimeSlot} ${date.toDateString()}` : null}
            </div>

            <div>
                {!isSubmitted ?
                    (<button type="submit" onClick={() => {
                            setIsSubmitted(true);
                            const isoFormatTime = bookedAppointments[0].appointment.substring(0, 11) + selectedTimeSlot + ":00";
                            return createAppointment(isoFormatTime)
                        }}>
                            SUBMIT
                        </button>
                    )
                    :
                    (<button type="submit" onClick={() => {
                            setIsSubmitted(false);
                            const isoFormatTime = bookedAppointments[0].appointment.substring(0, 11) + selectedTimeSlot + ":00";
                            return deleteAppointment(isoFormatTime)
                        }}>
                            DELETE
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default Times;