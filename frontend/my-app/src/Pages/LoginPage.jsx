import LoginForm from "../Components/LoginForm.jsx";
import Loading from "../Components/Loading";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const fetchUser = (userId) => {
    return fetch(`/users/${userId}`).then((res) => res.json());
};

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLoginUser = (user) => {
        console.log(user)
        setLoading(true);

        fetchUser(user.email)
            .then(() => {
                setLoading(false);
                navigate("/");
            })
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <LoginForm
            onCancel={() => navigate("/")}
            disabled={loading}
            onSave={handleLoginUser}
        />
    )
}

export default LoginPage;
