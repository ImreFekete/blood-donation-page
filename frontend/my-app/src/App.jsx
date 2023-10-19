import './App.css'
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "./Components/Loading";

const fetchUserById = (id) => {
    return fetch(`/api/users/${id}`).then((res) => res.json());
};

function deleteAppointment(id) {
    return fetch(`/api/appointments/${id}`, {method: "DELETE"}).then((res) => res.json());
}

function App() {
    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [appointment, setAppointment] = useState(null);

    if (id && !isLoggedIn) {
        setIsLoggedIn(true);
    }

    useEffect(() => {
        setLoading(true);
        if (id !== undefined) {
            fetchUserById(id)
                .then(({id, email, password, appointmentDTO}) => {
                    setUser({id, email, password, appointmentDTO});
                    setAppointment(appointmentDTO);
                    setLoading(false);
                });
        }
        setLoading(false);
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    /*return (
        <>
            <div className="mainTitle">{user ? `Welcome ${user.email} !` : "IMF LAB TESTS"}</div>
            {isLoggedIn && !appointment &&
                <Link to={`/calendar/${id}`}>
                    <button className='reservationButton' type="button">Reserve an appointment</button>
                </Link>}
            {!isLoggedIn &&
                <div className="buttonContainer">
                    <Link to="/login">
                        <button className='loginButton' type="button">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className='registerButton' type="button">Register</button>
                    </Link>

                </div>
            }
            {appointment &&
                <>
                    <div>
                        {`You have a reserved appointment at: ${appointment.appointment}`}
                    </div>
                    <button className='deleteButton' type="button" onClick={() => {
                        setAppointment(null);
                        return deleteAppointment(appointment.id);
                    }}>
                        Delete Appointment
                    </button>
                </>
            }
            {isLoggedIn &&
                <Link to="/">
                    <button className='logoutButton' type="button" onClick={() => {
                        setUser(null);
                        setAppointment(null);
                        setIsLoggedIn(false);
                    }}>
                        Log Out
                    </button>
                </Link>
            }
        </>
    )*/
    return (
        <div className="outerContainer">
            <div className="headerContainer">
                <div className="mainTitle">{user ? `Welcome ${user.email} !` : "IMF LAB TESTS"}</div>

                {appointment &&
                    <div className="message">
                        {`You have a reserved appointment at: ${appointment.appointment}`}
                    </div>
                }

                {!isLoggedIn &&
                    <div className="buttonContainer">
                        <Link to="/login">
                            <button className='loginButton' type="button">Login</button>
                        </Link>
                        <Link to="/register">
                            <button className='registerButton' type="button">Register</button>
                        </Link>
                    </div>
                }

                {isLoggedIn && !appointment &&
                    <div className="buttonContainer">
                        <Link to={`/calendar/${id}`}>
                            <button className='reservationButton' type="button">Reserve an appointment</button>
                        </Link>
                        <Link to="/">
                            <button className='logoutButton' type="button" onClick={() => {
                                setUser(null);
                                setAppointment(null);
                                setIsLoggedIn(false);
                            }}>
                                Log Out
                            </button>
                        </Link>
                    </div>
                }

                {appointment &&
                    <div className="buttonContainer">
                        <button className='deleteButton' type="button" onClick={() => {
                            setAppointment(null);
                            return deleteAppointment(appointment.id);
                        }}>
                            Delete Appointment
                        </button>
                        <Link to="/">
                            <button className='logoutButton' type="button" onClick={() => {
                                setUser(null);
                                setAppointment(null);
                                setIsLoggedIn(false);
                            }}>
                                Log Out
                            </button>
                        </Link>
                    </div>
                }
            </div>
            <div className="imageContainer">
                <img src="/nurse1.jpg" alt="Nurse 1" className="nurseImage"/>
                <img src="/nurse2.jpg" alt="Nurse 2" className="nurseImage"/>
            </div>
        </div>
    );

}

export default App
