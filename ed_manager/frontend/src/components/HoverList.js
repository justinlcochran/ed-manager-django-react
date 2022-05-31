import React, {useEffect, useState} from 'react';

function HoverList({list, color, handleClick}) {

    ///get request for users that are students
    ///map list in a div for last name, first name
    ///use text bar to filter state
    list.sort((a, b) => a.first_name.localeCompare(b.first_name))

    return (
        <div>
            {list && list.map(item => <p key={item.id} id={item.id} className={`hover:${color} text-2xl mx-32`} onClick={handleClick}>{item.first_name}</p>
            )}
        </div>
    );
}

export default HoverList;