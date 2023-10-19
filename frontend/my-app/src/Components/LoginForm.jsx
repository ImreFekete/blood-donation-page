import {useState} from "react";


const LoginForm = ({ onSave, disabled, onCancel }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        const regexPattern = /[\w.]+@\w+\.\w{2,4}[a-z.]{0,3}/g;
        if (!regexPattern.test(email)) {
            return alert("The given E-mail format is not valid!")
        }

        return onSave({
            email,
            password
        });
    };

    return (
        <form className="LoginForm" onSubmit={onSubmit}>
            <div className="control">
                <label htmlFor="email">Email:</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    id="email"
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

            <div className="buttons">
                <button type="submit" disabled={disabled}>
                    Login
                </button>

                <button type="button" onClick={onCancel}>
                    Back
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
