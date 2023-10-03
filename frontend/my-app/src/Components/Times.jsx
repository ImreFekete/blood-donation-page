import {useState} from 'react';

const times = ['08:00','09:00','10:00','14:00','15:00'];

function Times({showTime, date}) {

    const [event, setEvent] = useState(null);
    const [info, setInfo] = useState(false);

    function displayInfo(e) {
        setInfo(true);
        setEvent(e.target.innerText);
    }

    return (
        <div className="times">
            {times.map(time => {
                return (
                    <div key={time}>
                        <button onClick={(e)=> displayInfo(e)}> {time} </button>
                    </div>
                )
            })}
            <div>
                {info ? `Your appointment is set to ${event} ${props.date.toDateString()}` : null}
            </div>
        </div>
    )
}

export default Times;