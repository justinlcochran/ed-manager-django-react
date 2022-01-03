import React, {useContext} from 'react';
import {Link, useLocation} from "react-router-dom";
import AuthContext from "../context/AuthContext";

function LogButton(props) {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <li className={'nav-li'}>
            {user? (
                <p className={'nav-link nav-p'} onClick={logoutUser}>Logout</p>
                ):(
                <Link to={'/login'} className={'nav-link'}>Login</Link>
            )}
        </li>
    );
}

export default LogButton;