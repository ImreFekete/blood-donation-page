import './App.css'
import {Link} from "react-router-dom";

function App() {
    return (
        <>
            <div>Main Page</div>
            <Link to="/calendar">
                <button className='reservationButton' type="button">Reserve an appointment</button>
            </Link>
        </>
    )
}

export default App
