import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Loading from "../Components/Loading/index.js";

const fetchUsers = () => {
    const token = localStorage.getItem('jwtToken');
    return fetch("/api/users", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());
}

const AdminPage = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers()
            .then((users) => {
                setLoading(false);
                setUsers(users);
            })
    }, []);

    if (loading) {
        return <Loading/>;
    }

    return (
        <>
            {users.map((user, index) => {
                return <div key={index}>
                    <>{user.name}</>
                </div>
            })}
            <Link to="/">
                <button className='logoutButton' type="button" onClick={() => {
                    localStorage.removeItem('jwtToken');
                }}>
                    Log Out
                </button>
            </Link>
        </>
    )

}

export default AdminPage;
