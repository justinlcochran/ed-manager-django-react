import React, {useEffect, useState} from 'react';
import StandardSelector from "../components/StandardSelector";
import {CreateAssessmentProvider} from "../context/CreateAssessmentContext";

function CreateAssessment(props) {

    let [standard, setStandard] = useState({id: null, code: null, text:'Choose a Standard', subject:null})
    let [items, setItems] = useState([]);
    let [knowShow, setKnowShow] = useState([])
    let [selectedKnowShow, setSelectedKnowShow] = useState(null)
    let [assessmentKnowShow, setAssessmentKnowShow] = useState(null)

    const handleChange = (e) => {
        let obj = items.find(item => item.id == e.target.value)
        setStandard(obj)
        let newKnowShows = knowShow.filter(item => item.standard == e.target.value)
        setSelectedKnowShow(newKnowShows)
    }

    const handleKSClick = (e) => {
        setAssessmentKnowShow(e.target.value)
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/knowshowchart")
            .then(res => res.json())
            .then(
                (result) => {
                    setKnowShow(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.

            )
    }, [])


    return (
        <div>
            <CreateAssessmentProvider>
                <StandardSelector standard={standard} setStandard={setStandard} handleChange={handleChange} items={items} setItems={setItems}/>
                {selectedKnowShow ? selectedKnowShow.map(chart =>
                    <button value={chart.id} onClick={handleKSClick} key={chart.id}>
                        Chart created by {chart.author} on {chart.created}
                    </button>) : <p></p>}
                {assessmentKnowShow && <p>Create an assessment for KSC{assessmentKnowShow}</p>}
            </CreateAssessmentProvider>
        </div>
    );
}

export default CreateAssessment;
