import React, {useState} from 'react';
import TextField from './TextField';

function ChartColumn({title, popUpText, setFieldValues, fields}) {
    const [popState, setPopState] = useState(false);
    const [textAreas, setTextAreas] = useState(
        [{colType: title, textAreaId: 0, placeholder: 'Type Here...'}]
    )
    const handleAdd = () => {
        let newTextArea = [...textAreas, {colType:title, textAreaId: textAreas[textAreas.length-1].textAreaId+1, placeholder: 'Type Here...'}]
        setTextAreas(newTextArea)
    }

    return (
        <td className={"top-td"}>
            <div>
                <div className={`popup`} onClick={() => setPopState(!popState)}>
                    <h1 className={'title'}>{title}</h1>
                    <span className={`popuptext ${popState ? "show" : ""}`}>{popUpText}</span>
                </div>
                {textAreas.map(item => (
                    <TextField type={item.colType} value={item.placeholder} key={item.textAreaId} id={item.textAreaId} title={title} fields={fields} setFieldValues={setFieldValues} />
                ))}
                <button className="center block add-button" type={"button"} onClick={() => handleAdd()} name={title}>+
                </button>

            </div>
        </td>
    );
}

export default ChartColumn;
