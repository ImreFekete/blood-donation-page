import Calendar from "react-calendar";
import * as PropTypes from "prop-types";

function CalendarBox({ onChange, value, onClickDay, tileDisabled}) {
    return <div className="calendarBox">
        <Calendar
            onChange={onChange}
            value={value}
            onClickDay={onClickDay}
            tileDisabled={tileDisabled}
        />
    </div>;
}

// CalendarBox.propTypes = {
//     onChange: PropTypes.func,
//     value: PropTypes.any,
//     onClickDay: PropTypes.func,
//     tileDisabled: PropTypes.func
// };
export default CalendarBox;