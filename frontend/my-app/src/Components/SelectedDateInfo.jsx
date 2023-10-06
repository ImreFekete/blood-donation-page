function SelectedDateInfo(props) {
    return <>
        {props.date.length > 0 ? (
            <p>
                <span>Start:</span>
                {props.date[0].toDateString()}
                &nbsp;
                &nbsp;
                <span>End:</span>{props.date[1].toDateString()}
            </p>
        ) : (
            <p className="textSelectedDate">
                <span>Selected date: </span>{props.date.toDateString()}.
            </p>
        )}
    </>;
}

export default SelectedDateInfo;