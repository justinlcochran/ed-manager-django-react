import React from 'react';

function TextField({id, title, fields, setFieldValues, value, type, placeholder}) {
    const handleTooLong = (e) => {
        const target = e.target;
        target.style.height = "100px"
        target.style.height = `${target.scrollHeight}px`
    }

    const handleChange = (e, id) => {
        fields[title][id] = e.target.value;
    }

    return (
        <div className={"my-3"}>
            <textarea placeholder={placeholder} className={'text-box font-sans bg-amber-200 mx-2 p-4 pb-14 overflow-hidden rounded'} id={id} placeholder={value} onChange={e => handleChange(e, id)} onKeyDown={handleTooLong} />
        </div>
    );
}

export default TextField;