import React, {useContext} from 'react';
import NavButton from "./NavButton";
import AuthContext from "../context/AuthContext";
import LogButton from "./LogButton";

function NavBar(props) {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div>
            <ul className={'nav-list'}>
                <NavButton name={'/'} title={'Home'}/>
                <NavButton name={'/create'} title={'ToDo'}/>
                <NavButton name={'/assign'} title={'My Enrollments'}/>
                <NavButton name={'/data'} title={'My Data'}/>
                <LogButton />
            </ul>
        </div>
    );
}

export default NavBar;