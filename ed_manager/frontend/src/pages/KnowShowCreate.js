import React, {useState} from 'react';
import ChartColumn from "../components/ChartColumn";

function KnowShowCreate(props) {
    const [fieldsValues, setFieldsValues] = useState([
        {type: 'know' , content: {}},
        {type: 'show', content: {}},
        {type: 'scaffold', content: {}},
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(fieldsValues)
    }
    const showMe = () => {
        console.log(fieldsValues)
    }
    const categories = ['Know', 'Show', 'Scaffold']
    const knowText = 'Know entries should be full sentences representing the information students should learn and retain through the course of learning this standard.'
    const showText = 'Show entries should be \'I can...\' statements indicating skills that students will develop through the course of learning this standard.'
    const scaffText = 'Scaffold entries should be knowledge and skills that students need to have mastered previously in order to succeed in learning this standard. This list is purely for planning and will not be incorporated into the assessment design workflow.'

    return (
        <div>
            <table className={'center'}>
                <tbody>
                <tr>
                    <ChartColumn title={categories[0]} popUpText={knowText} setFieldValues={setFieldsValues} fields={fieldsValues} catIndex={0}/>
                    <ChartColumn title={categories[1]} popUpText={showText} setFieldValues={setFieldsValues} fields={fieldsValues} catIndex={1}/>
                    <ChartColumn title={categories[2]} popUpText={scaffText} setFieldValues={setFieldsValues} fields={fieldsValues} catIndex={2}/>
                </tr>
                </tbody>
            </table>
            <button onClick={showMe}>I Am Here, Click Me</button>
        </div>
    );
}

export default KnowShowCreate;