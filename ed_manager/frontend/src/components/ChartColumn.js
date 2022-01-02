import React, {useState} from 'react';

function ChartColumn({ popUpText, title}) {
    const [popState, setPopState] = useState(false);

    const [fieldState, setFieldState] = useState([{[`${title}`]: ''}]);

    let handleChange = (i, e) => {
        let newFieldState = [...fieldState];
        newFieldState[i][[`${title}`]] = e.target.value;
        setFieldState(newFieldState);
    }

    const handleTooLong = (e) => {
        const target = e.target;
        target.style.height= "30px"
        target.style.height = `${target.scrollHeight}px`
    }


    const handleAdd = () => {
        setFieldState([...fieldState, {[`${title}`]: ''}]);
    }

    const fieldValues = fieldState.map( function (currentElement) {
        return currentElement[`${title}`]
    });

    const fieldValueDict = {[`${title}`]: fieldValues}

    return (
        <td className={"top-td"}>
            <div>
                <div className={`popup`} onClick={() => setPopState(!popState)}>
                    <h1>{title}</h1>
                    <span className={`popuptext ${popState ? "show" : ""}`}>{popUpText}</span>
                </div>
                {fieldState.map((element, index) => (
                        <div key={index}>
                            <textarea className={'text-box'} key={index} name={title} onChange={e => handleChange(index, e)} onKeyDown={e => handleTooLong(e)} />
                        </div>
                    ))}

                <button className="center block add-button" type={"button"} onClick={() => handleAdd()} name={title}>+
                </button>

            </div>
        </td>
    );
}

export default ChartColumn;
