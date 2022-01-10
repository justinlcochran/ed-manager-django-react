import React, {useContext, useEffect, useState} from 'react';
import StandardSelector from "../components/StandardSelector";
import CreateAssessmentContext from "../context/CreateAssessmentContext";
import StandardContext from "../context/StandardContext";
import KnowShowButton from "../components/KnowShowButton";
import AssessmentQuestion from "../components/AssessmentQuestion";
import StudentQuestionPreview from "../components/StudentQuestionPreview";

function CreateAssessment() {
    let {knowShowRequired, setKnowShowRequired, knowShowSatisfied} = useContext(CreateAssessmentContext)
    let {selectedStandard} = useContext(StandardContext)
    let [knowShow, setKnowShow] = useState([])

    useEffect(()=> {
        if (!(selectedStandard.id == null) && !(selectedStandard.id === knowShowRequired.standard) && !(knowShowRequired.standard == null)) {
            setKnowShowRequired({id: null, content: {know: [], show: []}, standard: null})
        } else {
            return null
        }
    })


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
                        <KnowShowButton key={chart.id} chart={chart} />
                    )))}
            <div className="grid sm:grid-cols-1 lg:grid-cols-2">
            {knowShowRequired.content.know.map(item => (
                    (knowShowSatisfied.includes(item))
                        ? <StudentQuestionPreview key={item} ksText={item}/>
                        : <AssessmentQuestion key={item} ksText={item} />
                ))
            }
            {knowShowRequired.content.show.map(item => (<AssessmentQuestion key={item} ksText={item}/>))}
            </div>
        </div>
    );
}

export default CreateAssessment;
