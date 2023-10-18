import './App.css'
import {Link, useParams} from "react-router-dom";
import {useState} from "react";

function App() {
    const {id} = useParams();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log("ID: ", id);
    console.log("ISLOGGEDIN: ", isLoggedIn);

    if (id && !isLoggedIn) {
        setIsLoggedIn(true);
    }

    return (
        <>
            <div>Main Page</div>
            {isLoggedIn &&
                <Link to={`/calendar/${id}`}>
                    <button className='reservationButton' type="button">Reserve an appointment</button>
                </Link>}
            {!isLoggedIn &&
                <>
                    <Link to="/login">
                        <button className='loginButton' type="button">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className='registerButton' type="button">Register</button>
                    </Link>
                </>
            }
        </>
    )
}

export default App
