import React, {useState} from 'react';
import TextField from './TextField';

function ChartColumn({title, popUpText, setFieldValues, fields, catIndex}) {
    const [popState, setPopState] = useState(false);
    const [textAreas, setTextAreas] = useState(
        [{colType: title, textAreaId: 1, placeholder: 'Type Here...'}]
    )
    const handleAdd = () => {
        let newTextArea = [...textAreas, {colType:title, textAreaId: textAreas[textAreas.length-1].textAreaId+1, placeholder: 'Type Here...'}]
        setTextAreas(newTextArea)

    }
    console.log(textAreas)
    return (
        <td className={"top-td"}>
            <div>
                <div className={`popup`} onClick={() => setPopState(!popState)}>
                    <h1>{title}</h1>
                    <span className={`popuptext ${popState ? "show" : ""}`}>{popUpText}</span>
                </div>
                {textAreas.map(item => (
                    <TextField type={item.colType} value={item.placeholder} key={item.textAreaId} id={item.textAreaId} catIndex={catIndex} fields={fields} setFieldValues={setFieldValues} />
                ))}
                <button className="center block add-button" type={"button"} onClick={() => handleAdd()} name={title}>+
                </button>

            </div>
        </td>
    );
}

export default ChartColumn;
