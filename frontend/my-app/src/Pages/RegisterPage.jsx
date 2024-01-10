import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import UserForm from "../Components/UserForm.jsx";
import Loading from "../Components/Loading/index.js";
import UserContext from "./UserContext.jsx";
import Header from "../Components/Header.jsx";

const createUser = (user) => {
    return fetch("/api/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then((res) => {
        console.log(res);
        return res.status;
    });
};

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {user, setUser} = React.useContext(UserContext);

    const handleCreateUser = (user) => {
        setLoading(true);

        createUser(user)
            .then((statusCode) => {
                console.log(statusCode);
                if (statusCode === 400) {
                    setLoading(false);
                    // TODO: store name and password in state to avoid data loss on UI when email exists
                    return alert("The given E-mail address already exists!")
                } else if (statusCode === 500) {
                    setLoading(false);
                    // TODO: change alerts to some (error) component
                    return alert("Server error")
                } else if (statusCode === 201) {
                    setLoading(false);
                    navigate("/");
                }
            });
    };

    if (loading) {
        return <Loading/>;
    }

    return (
        <>
            <Header/>
            <UserForm
                onSave={handleCreateUser}
                disabled={loading}
                onCancel={() => navigate("/")}
            />
        </>
    )
}

export default RegisterPage;
