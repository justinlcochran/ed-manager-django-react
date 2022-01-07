import React, {useState} from 'react';
import TextField from './TextField';

function ChartColumn({title, popUpText, setFieldValues, fields, placeholder}) {
    const [popState, setPopState] = useState(false);
    const [textAreas, setTextAreas] = useState(
        [{colType: title, textAreaId: 0, placeholder: `${placeholder}`}]
    )
    const handleAdd = () => {
        let newTextArea = [...textAreas, {colType:title, textAreaId: textAreas[textAreas.length-1].textAreaId+1, placeholder: 'Type Here...'}]
        setTextAreas(newTextArea)
    }

    return (
        <div>
            <div>
                <div className={`popup`} onClick={() => setPopState(!popState)}>
                    <p className={"capitalize text-2xl font-bold font-sans "}>{title}</p>
                    <span className={`popuptext ${popState ? "show" : ""}`}>{popUpText}</span>
                </div>
                {textAreas.map(item => (
                    <TextField type={item.colType} value={item.placeholder} key={item.textAreaId} id={item.textAreaId} title={title} fields={fields} setFieldValues={setFieldValues} />
                ))}
                <button className="inline-flex bg-lime-600 max-w-max rounded font-bold px-2 hover:bg-lime-700" type={"button"} onClick={() => handleAdd()} name={title}>
                    <img src="https://ucarecdn.com/fba38ac8-7b37-4a34-abcc-afca5c76c53d/Untitleddesign.png" className={"h-5 w-5 p-1 justify-center"}/>
                </button>

            </div>
        </div>
    );
}

export default ChartColumn;
