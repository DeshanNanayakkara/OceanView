import React, {useContext} from 'react';
import {AuthContext} from "./AuthProvider.jsx";
import {Link, useNavigate} from "react-router-dom";

const Logout = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.handleLogout()
        navigate("/", { state: {message : "You have been logged out!"} })
        alert(
            "You have been logged out! \n" +
            "You will be redirected to the home page."
        )
        window.location.reload()
    }

    return (
        <>
            <li>
                <Link className="dropdown-item" to={"/profile"}>
                    Profile
                </Link>
            </li>
            <li>
                <hr className="dropdown-divider" />
            </li>
            <button className="dropdown-item" onClick={handleLogout}>
                Logout
            </button>
        </>
    )
};

export default Logout;
