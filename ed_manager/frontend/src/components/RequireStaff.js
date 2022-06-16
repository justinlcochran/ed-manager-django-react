import React, {useContext} from 'react';
import AuthContext from "../context/AuthContext";
import {Navigate} from "react-router-dom";

function RequireStaff({children}) {
    const {user} = useContext(AuthContext)

    return (user)
    ? (user.role != 'Student')
        ? children
        : <Navigate to={'/student'} replace />
    : <Navigate to={'/login'} replace />
    ;
}

export default RequireStaff;
