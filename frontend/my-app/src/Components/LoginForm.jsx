import {useState} from "react";
import Header from "./Header.jsx";


const LoginForm = ({ onSave, disabled, onCancel }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onSubmit = (e) => {
        e.preventDefault();

        const regexPattern = /[\w.]+@\w+\.\w{2,4}[a-z.]{0,3}/g;
        if (!regexPattern.test(email)) {
            return alert("The given E-mail format is not valid!");
        }

        return onSave({
            email,
            password
        });
    };

    return (
        <div className="outerContainer">
           <Header/>

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
                    type="password"
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
