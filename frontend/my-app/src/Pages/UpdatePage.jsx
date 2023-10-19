import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UserForm from "../Components/UserForm.jsx";
import Loading from "../Components/Loading";

const updateUser = (user) => {
    return fetch(`/api/users/update/${user.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then((res) => res.json());
};

const fetchUser = (id) => {
    return fetch(`/api/users/${id}`).then((res) => res.json());
};

const UpdatePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
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
        return <Loading />;
    }

    return (
        <UserForm
            user={user}
            onSave={handleUpdateUser}
            disabled={updateLoading}
            onCancel={() => navigate(`/user/${id}`)}
        />
    );
}

export default UpdatePage;
