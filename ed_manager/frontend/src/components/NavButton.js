import React from 'react';
import {Link} from "react-router-dom";

function NavButton({name, title}) {
        return (
            <li className={'nav-li'}>
                <Link to={name} className={'nav-link text-2xl'}>{title}</Link>
            </li>
        );
}

export default NavButton;