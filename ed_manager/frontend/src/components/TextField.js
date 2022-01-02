import React from 'react';

function TextField({id, catIndex, fields, setFieldValues, value, type}) {
    const handleTooLong = (e) => {
        const target = e.target;
        target.style.height= "30px"
        target.style.height = `${target.scrollHeight}px`
    }

    const handleChange = (e, id) => {
        fields[catIndex].content[`${type}${id}`] = e.target.value;
        setFieldValues(fields)
    }

    return (
        <div>
            <textarea className={'text-box'} id={id} placeholder={value} onChange={e => handleChange(e, id)} onKeyDown={handleTooLong} />
        </div>
    );
}

export default TextField;