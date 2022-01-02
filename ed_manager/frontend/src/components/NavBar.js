import React from 'react';
import NavButton from "./NavButton";

function NavBar(props) {
    return (
        <div>
            <ul className={'nav-list'}>
                <NavButton name={'/'} title={'Home'}/>
                <NavButton name={'/create'} title={'Create'}/>
                <NavButton name={'/assign'} title={'Assign'}/>
                <NavButton name={'/data'} title={'Data'}/>

            </ul>
        </div>
    );
}

export default NavBar;