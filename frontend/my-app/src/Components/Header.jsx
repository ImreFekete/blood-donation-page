import React from 'react';

const Header = ({user}) => {
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
