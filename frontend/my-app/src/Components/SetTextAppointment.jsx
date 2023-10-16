// import * as PropTypes from "prop-types";

function SetTextAppointment({info, selectedTime}) {
    return <div className="textAppointmentSet">
        {info ? `Your appointment is set to ${selectedTime}.` : null}
    </div>;
}

// SetTextAppointment.propTypes = {
//     info: PropTypes.bool,
//     selectedTime: PropTypes.string
// };

export default SetTextAppointment;