import React from 'react';

function TextField({id, title, fields, setFieldValues, value, type}) {
    const handleTooLong = (e) => {
        const target = e.target;
        target.style.height= "30px"
        target.style.height = `${target.scrollHeight}px`
    }

    const handleChange = (e, id) => {
        fields[title][id] = e.target.value;
    }

    return (
        <div>
            <textarea className={'text-box font-sans'} id={id} placeholder={value} onChange={e => handleChange(e, id)} onKeyDown={handleTooLong} />
        </div>
    );
}

export default TextField;