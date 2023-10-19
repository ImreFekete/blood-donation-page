import {useState} from "react";


const LoginForm = ({ onSave, disabled, onCancel }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        return onSave({
            email,
            password
        });
    };

    return (
        <div className="outerContainer">
        <div className="mainTitle">{"IMF LAB TESTS"}</div>
        <form className="LoginForm" onSubmit={onSubmit}>
            <div className="formBox">

            <div className="control">
                <label htmlFor="email">Email: </label>
                <input
                    className="field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    id="email"
                />
            </div>

            <div className="control">
                <label htmlFor="password">Password: </label>
                <input
                    className="field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                />
            </div>
            </div>

            <div className="buttonContainer">
                <button className='loginButton' type="submit" disabled={disabled}>
                    Login
                </button>

                <button className='backButton' type="button" onClick={onCancel}>
                    Back
                </button>
            </div>
        </form>
        </div>
    );
};

export default LoginForm;
