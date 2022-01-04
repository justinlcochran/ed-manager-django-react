import React, {useContext, useState} from 'react';
import ChartColumn from "../components/ChartColumn";
import StandardSelector from "../components/StandardSelector";
import AuthContext from "../context/AuthContext";

function KnowShowCreate(props) {
    let {user} = useContext(AuthContext)

    let [standard, setStandard] = useState({id: null, code: null, text:'Choose a Standard', subject:null})
    const [items, setItems] = useState([]);

    const handleChange = (e) => {
        let obj = items.find(item => item.id == e.target.value)
        setStandard(obj)
    }

    const [fieldsValues, setFieldsValues] = useState(
        {know: {}, show: {}, scaffold: {}}
    );

    const handleSubmit = async (e) => {
        e.preventDefault()
        const serverURL = 'http://127.0.0.1:8000/api/createknowshow/'
        const response = await fetch(serverURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({fields: fieldsValues, standard: standard, user: user})
        });
        const data = await response;
        return data
    }

    const knowText = 'Know entries should be full sentences representing the information students should learn and retain through the course of learning this standard.'
    const showText = 'Show entries should be \'I can...\' statements indicating skills that students will develop through the course of learning this standard.'
    const scaffText = 'Scaffold entries should be knowledge and skills that students need to have mastered previously in order to succeed in learning this standard. This list is purely for planning and will not be incorporated into the assessment design workflow.'

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <StandardSelector standard={standard} setStandard={setStandard} items={items} setItems={setItems} handleChange={handleChange} />
                <table className={'center'}>
                    <tbody>
                    <tr>
                        <ChartColumn title={'know'} popUpText={knowText} setFieldValues={setFieldsValues} fields={fieldsValues} />
                        <ChartColumn title={'show'} popUpText={showText} setFieldValues={setFieldsValues} fields={fieldsValues} />
                        <ChartColumn title={'scaffold'} popUpText={scaffText} setFieldValues={setFieldsValues} fields={fieldsValues} />
                    </tr>
                    </tbody>
                </table>
                <input type={'submit'}/>
            </form>
        </div>
    );
}

export default KnowShowCreate;