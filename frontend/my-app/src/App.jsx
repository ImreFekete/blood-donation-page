import './App.css'
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "./Components/Loading";
import moment from 'moment';

const fetchUserById = (id) => {
    const token = localStorage.getItem('jwtToken');
    console.log("TOKEN", token);
    return fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());
};

function deleteAppointment(id) {
    const token = localStorage.getItem('jwtToken');
    return fetch(`/api/appointments/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());
}

const deleteUser = (id) => {
    const token = localStorage.getItem('jwtToken');
    return fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((res) =>
        res.json()
    );
}

function App() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [appointment, setAppointment] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    if (id && !isLoggedIn) {
        setIsLoggedIn(true);
    }

    useEffect(() => {
        setLoading(true);
        if (id !== undefined) {
            fetchUserById(id)
                .then(({id, name, email, password, role, appointmentDTO}) => {
                    setUser({id, name, email, password, role, appointmentDTO});
                    if (role === "ADMIN") {
                        setIsAdmin(true);
                    }
                    setAppointment(appointmentDTO);
                    setLoading(false);
                });
        }
        setLoading(false);
    }, [id]);

    if (loading) {
        return <Loading/>;
    }

    //TODO: Header component
    return (
        <div className="outerContainer">
            <div className="headerContainer">
                <div className="mainTitle">
                    <img src="/imf_logo.png" alt="IMF logo" className="ImfLogo"/>
                    {user ? `Welcome ${user.name} !` : "IMF REDLABS BLOOD DONATION"}
                </div>

                {isLoggedIn && isAdmin &&
                    <div>
                    <Link to="/admin">
                        <button className='adminButton' type="button">List all users</button>
                    </Link>
                    </div>
                }

                {appointment &&
                    <div className="message">
                        {`You have a reserved appointment at: ${moment(appointment.appointment).format('YYYY.MM.DD HH:mm')}`}
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

                {isLoggedIn &&
                    <div className="buttonContainer">
                        <Link to={`/update/${id}`}>
                            <button className='updateButton' type="button">Update Account</button>
                        </Link>
                        <button className='removeButton' type='button' onClick={() => {
                            if (window.confirm("Are you sure you want to delete your account?")) {
                                deleteUser(id)
                                    .then(() => {
                                        setIsLoggedIn(false);
                                        setUser(null);
                                        navigate("/");
                                    })
                            }
                        }}>Remove Account
                        </button>
                    </div>
                }

                {isLoggedIn && !appointment &&
                    <div className="buttonContainer">
                        <Link to={`/calendar/${id}`}>
                            <button className='reservationButton' type="button">Reserve an appointment</button>
                        </Link>
                        <Link to="/">
                            <button className='logoutButton' type="button" onClick={() => {
                                localStorage.removeItem('jwtToken');
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
                                localStorage.removeItem('jwtToken');
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
