import React from 'react';
import UserContext from "../Pages/UserContext.jsx";

const Header = () => {
    const { user, setUser } = React.useContext(UserContext);
    return (
        <header>
            <div className="mainTitle">
                <img src="/imf_logo.png" alt="IMF logo" className="ImfLogo"/>
                {user ? `Welcome ${user.name} !` : "IMF REDLABS BLOOD DONATION"}
            </div>
        </header>
    );
};

export default Header;
