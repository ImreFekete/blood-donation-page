import Times from "./Times.jsx";

function Time(props) {

    return (
        <div>
            {props.showTime ? <Times date={props.date}/> : null}
        </div>
    )
}

export default Time;