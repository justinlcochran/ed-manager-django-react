import React, {useContext, useState} from 'react';
import ChartColumn from "../components/ChartColumn";
import StandardSelector from "../components/StandardSelector";
import AuthContext from "../context/AuthContext";

function KnowShowCreate(props) {
    let {user} = useContext(AuthContext)

    let [standard, setStandard] = useState({id: null, code: null, text:'Choose a Standard', subject:null})

    const [fieldsValues, setFieldsValues] = useState([
        {type: 'know' , content: {}},
        {type: 'show', content: {}},
        {type: 'scaffold', content: {}},
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        let postContent = fieldsValues
        postContent.push(standard)
        postContent.push(user)
        const serverURL = 'http://127.0.0.1:8000/api/createknowshow/'
        const response = await fetch(serverURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postContent)
        });
        const data = await response;
        return data
    }

    const categories = ['Know', 'Show', 'Scaffold']
    const knowText = 'Know entries should be full sentences representing the information students should learn and retain through the course of learning this standard.'
    const showText = 'Show entries should be \'I can...\' statements indicating skills that students will develop through the course of learning this standard.'
    const scaffText = 'Scaffold entries should be knowledge and skills that students need to have mastered previously in order to succeed in learning this standard. This list is purely for planning and will not be incorporated into the assessment design workflow.'

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <StandardSelector standard={standard} setStandard={setStandard} />
                <table className={'center'}>
                    <tbody>
                    <tr>
                        <ChartColumn title={categories[0]} popUpText={knowText} setFieldValues={setFieldsValues} fields={fieldsValues} catIndex={0}/>
                        <ChartColumn title={categories[1]} popUpText={showText} setFieldValues={setFieldsValues} fields={fieldsValues} catIndex={1}/>
                        <ChartColumn title={categories[2]} popUpText={scaffText} setFieldValues={setFieldsValues} fields={fieldsValues} catIndex={2}/>
                    </tr>
                    </tbody>
                </table>
                <input type={'submit'}/>
            </form>
        </div>
    );
}

export default KnowShowCreate;