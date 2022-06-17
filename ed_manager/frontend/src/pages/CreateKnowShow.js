import React, {useContext, useEffect, useState} from 'react';
import ChartColumn from "../components/ChartColumn";
import StandardSelector from "../components/StandardSelector";
import AuthContext from "../context/AuthContext";
import StandardContext from "../context/StandardContext";

function CreateKnowShow(props) {
    let {user} = useContext(AuthContext)
    let {selectedStandard, allStandards} = useContext(StandardContext)
    const [isLoaded, setIsLoaded] = useState(null)
    const [error, setError] = useState(null)
    const [standardSets, setStandardSets] = useState(null)
    const [selectedStandardSet, setSelectedStandardSet] = useState(null)
    const [possibleStandards, setPossibleStandards] = useState([])


    const [fieldsValues, setFieldsValues] = useState(
        {know: {}, show: {}, scaffold: {}}
    );

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/standardset/")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setStandardSets(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const handleSubmit = async (e) => {
        if (window.confirm('Are you sure your Know Show Chart is complete?')) {
            const serverURL = '/createknowshow/'
            const response = await fetch(serverURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({fields: fieldsValues, standard: selectedStandard, user: user})
            });
            const data = await response;
            return data
        } else {
            e.preventDefault()
            return false
        }
    }

    const knowText = 'Know entries should be full sentences representing the information students should learn and retain through the course of learning this standard.'
    const showText = 'Show entries should be \'I can...\' statements indicating skills that students will develop through the course of learning this standard.'
    const scaffText = 'Scaffold entries should be knowledge and skills that students need to have mastered previously in order to succeed in learning this standard. This list is purely for planning and will not be incorporated into the assessment design workflow.'

    let handleStandardSetSelect = (e) => {
        setSelectedStandardSet(standardSets.find(item => (item.title === e.target.value)))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select className={"text-gray-600 text-2xl rounded mx-4"} defaultValue={'1'}
                        onChange={handleStandardSetSelect} id="topicsDropDown"
                        name="topicsDropDown">
                    <option disabled value="1">Select a Standard Set</option>
                    {(standardSets) && standardSets.map(item => <option key={item.title}
                                                                        value={item.title}>{`${item.grade} | ${item.title}`}</option>)}
                </select>

                {(selectedStandardSet) && <StandardSelector standardSet={selectedStandardSet.id}/>}
                <div className={'flex gap-5 justify-center'}>
                        <ChartColumn title={'know'} popUpText={knowText} setFieldValues={setFieldsValues} fields={fieldsValues} placeholder={"Type Here ..."}/>
                        <ChartColumn title={'show'} popUpText={showText} setFieldValues={setFieldsValues} fields={fieldsValues} placeholder={"I can ..."}/>
                        <ChartColumn title={'scaffold'} popUpText={scaffText} setFieldValues={setFieldsValues} fields={fieldsValues} placeholder={"Students may need support with ..."}/>
                </div>
                <button className={"bg-red-500 hover:bg-gray-400 p-2 rounded"}>
                    <input className={"text-2xl"} type={'submit'}/>
                </button>
            </form>
        </div>
    );
}

export default CreateKnowShow;