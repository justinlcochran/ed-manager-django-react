import React from 'react';
import {Link, useLocation} from "react-router-dom";

function NavButton({name, title}) {
        return (
            <li className={'nav-li'}>
                <Link to={name} className={'nav-link'}>{title}</Link>
            </li>
        );
}

export default NavButton;