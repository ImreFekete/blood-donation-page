import * as PropTypes from "prop-types";

function SubmitOrDeleteButton({info ,onClick, submitted}) {
    return <div className="submitOrDeleteButton">
        {info ?
            <button type="submit" onClick={onClick}>
                {!submitted ? "SUBMIT" : "DELETE"}
            </button>
            :
            null
        }
    </div>;
}

SubmitOrDeleteButton.propTypes = {
    info: PropTypes.bool,
    onClick: PropTypes.func,
    submitted: PropTypes.bool
};

export default SubmitOrDeleteButton;