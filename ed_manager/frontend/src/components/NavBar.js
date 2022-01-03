import React, {useContext} from 'react';
import NavButton from "./NavButton";
import AuthContext from "../context/AuthContext";
import LogButton from "./LogButton";

function NavBar(props) {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div>
            {user && <h3>Hello {user.name}</h3>}
            <ul className={'nav-list'}>
                <NavButton name={'/'} title={'Home'}/>
                <NavButton name={'/create'} title={'Create'}/>
                <NavButton name={'/assign'} title={'Assign'}/>
                <NavButton name={'/data'} title={'Data'}/>
                <LogButton />
            </ul>
        </div>
    );
}

export default NavBar;