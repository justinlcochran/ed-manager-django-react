import React, {useContext, useEffect, useState} from 'react';
import StandardSelector from "../components/StandardSelector";
import CreateAssessmentContext, {CreateAssessmentProvider} from "../context/CreateAssessmentContext";
import StandardContext from "../context/StandardContext";
import KnowShowButton from "../components/KnowShowButton";

function CreateAssessment(props) {
    let {knowShowRequired, setKnowShowRequired} = useContext(CreateAssessmentContext)
    let {selectedStandard} = useContext(StandardContext)
    let [items, setItems] = useState([]);
    let [knowShow, setKnowShow] = useState([])
    let [assessmentKnowShow, setAssessmentKnowShow] = useState(null)

    const handleChange = (e) => {
        console.log(e.target.value)
    }

    const handleKSClick = (e) => {
        setKnowShowRequired(knowShow.find(chart => (chart.id === parseInt(e.target.value))))
    }

    useEffect(() => {
        fetch("/knowshowchart/")
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
                <StandardSelector />
                {knowShow.map(chart => (
                    (chart.standard === selectedStandard.id &&
                        <KnowShowButton key={chart.id} chart={chart} onClick={handleKSClick}/>
                    )))}
        </div>
    );
}

export default CreateAssessment;
