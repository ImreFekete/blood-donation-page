import React, {useState} from 'react';
import UserContext from "../Pages/UserContext.jsx";

const times = ['08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00',
    '13:30', '14:00', '14:30', '15:00'];

function Times({showTime, date, bookedAppointments, handleSelectedTime, info, setInfo, isSubmitted}) {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const {user, setUser} = React.useContext(UserContext);

    const bookedTimes = bookedAppointments.map(item => {
        return item.appointment.substring(11, 16);
    });

    // TODO: Remove timeslots from today when that time have already passed
    const availableTimes = times.filter(time => !bookedTimes.includes(time));

    function displayInfo(e) {
        setInfo(true);
        setSelectedTimeSlot(e.target.innerText);
    }

    return (
        <div className="times">
            <div>
                {(!user.appointmentDTO ?
                        ((!isSubmitted) ?
                            (availableTimes.map(time => {
                                return (
                                    <div key={time}>
                                        <button onClick={(e) => {
                                            handleSelectedTime(time);
                                            displayInfo(e)
                                        }}>
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
                            </div>))
                        :
                        (<div>
                            <button onClick={(e) => displayInfo(e)}>
                                {user.appointmentDTO.appointment.substring(11, 16)}
                            </button>
                        </div>)
                )}
            </div>
        </div>
    )
}

export default Times;
