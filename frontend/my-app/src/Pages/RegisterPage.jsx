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

// TODO: It is switched of right now, email check done by createUser() fetch
const checkEmail = (email) => {
    const emailObject = {
        email: email
    };

    return fetch("/api/users/checkemail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(emailObject),
    }).then((res) => res.json());
}

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
                    return alert("The given E-mail address already exists!")
                } else if (statusCode === 500) {
                    setLoading(false);
                    return alert("Server error") // TODO: change alerts to some (error) component
                } else if (statusCode === 201) {
                    setLoading(false);
                    navigate("/");
                }
            });
    };

    const handleCheckEmail = async (email) => {
        try {
            const data = await checkEmail(email);
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    if (loading) {
        return <Loading/>;
    }

    return (
        <>
            <Header/>
            <UserForm
                onSave={handleCreateUser}
                checkEmail={handleCheckEmail}
                disabled={loading}
                onCancel={() => navigate("/")}
            />
        </>
    )
}

export default RegisterPage;
