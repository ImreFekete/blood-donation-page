import {useState} from "react";

const UserForm = ({onSave, onCancel, disabled, user}) => {
    const [name, setName] = useState(user?.name ?? "");
    const [password, setPassword] = useState(user?.password ?? "");
    const [email, setEmail] = useState(user?.email ?? "");

    function isEmpty(str) {
        return !str.trim().length;
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (isEmpty(name) || isEmpty(password) || isEmpty(email)) {
            return alert("Please fill in the fields correctly!")
        }

        if (user) {
            return onSave({
                ...user,
                name,
                password,
                email
            });
        }

        return onSave({
            name,
            password,
            email
        });
    }

    return (
        <form className="UserForm" onSubmit={onSubmit}>
            <div className="control">
                <label htmlFor="name">Name:</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    id="name"
                />
            </div>

            <div className="control">
                <label htmlFor="password">Password:</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                />
            </div>

            <div className="control">
                <label htmlFor="email">E-Mail address:</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    id="email"
                />
            </div>

            <div className="buttons">
                <button type="submit" disabled={disabled}>
                    {user ? "Update User" : "Submit"}
                </button>

                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default UserForm;
