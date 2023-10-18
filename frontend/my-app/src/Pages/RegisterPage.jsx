import {useState} from "react";
import {useNavigate} from "react-router-dom";
import UserForm from "../Components/UserForm.jsx";
import Loading from "../Components/Loading/index.js";

const createUser = (user) => {
    return fetch("/api/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then((res) => res.json());
};

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreateUser = (user) => {
        setLoading(true);

        createUser(user)
            .then(() => {
                    setLoading(false);
                    navigate("/");
                })
    };

    if (loading) {
        return <Loading/>;
    }

    return (
        <UserForm
            onSave={handleCreateUser}
            disabled={loading}
            onCancel={() => navigate("/")}
        />
    )
}

export default RegisterPage;
