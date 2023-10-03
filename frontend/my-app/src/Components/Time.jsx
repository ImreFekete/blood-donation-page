import Times from "./Times.jsx";

function Time({showTime, date}) {
    console.log(showTime);
    console.log(date);

    return (
        <div>
            {showTime ? <Times date={date}/> : null}
        </div>
    )
}

export default Time;