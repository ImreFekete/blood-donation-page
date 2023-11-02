import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UserForm from "../Components/UserForm.jsx";
import Loading from "../Components/Loading";
import UserContext from "./UserContext.jsx";
import Header from "../Components/Header.jsx";

const updateUser = (user) => {
    const token = localStorage.getItem('jwtToken');
    return fetch(`/api/users/update/${user.id}`, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    }).then((res) => res.json());
};

const fetchUser = (id) => {
    const token = localStorage.getItem('jwtToken');
    console.log("TOKEN IN UPDATE USER: ", token);
    return fetch(`/api/users/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    ).then((res) => res.json());
};

const UpdatePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);

    //const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        setUserLoading(true);
        fetchUser(id)
            .then((user) => {
                setUser(user);
                setUserLoading(false);
            });
    }, [id]);

    const handleUpdateUser = (user) => {
        setUpdateLoading(true);
        updateUser(user)
            .then(() => {
                setUpdateLoading(false);
                navigate(`/user/${id}`);
            });
    }

    if (userLoading) {
        return <Loading/>;
    }

    return (
        <>
        <Header/>

        <UserForm
            user={user}
            onSave={handleUpdateUser}
            disabled={updateLoading}
            onCancel={() => navigate(`/user/${id}`)}
        />
            </>
    );
}

export default UpdatePage;
