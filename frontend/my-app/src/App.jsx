import './App.css'
import {Link} from "react-router-dom";

function App() {
    return (
        <>
            <div>Main Page</div>
            <Link to="/calendar">
                <button className='reservationButton' type="button">Reserve an appointment</button>
            </Link>
            <Link to="/login">
                <button className='loginButton' type="button">Login</button>
            </Link>
            <Link to="/register">
                <button className='registerButton' type="button">Register</button>
            </Link>
        </>
    )
}

export default App
