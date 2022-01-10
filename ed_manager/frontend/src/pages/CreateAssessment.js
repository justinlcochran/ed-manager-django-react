import React, {useContext, useEffect, useState} from 'react';
import StandardSelector from "../components/StandardSelector";
import CreateAssessmentContext from "../context/CreateAssessmentContext";
import StandardContext from "../context/StandardContext";
import KnowShowButton from "../components/KnowShowButton";
import AssessmentQuestion from "../components/AssessmentQuestion";
import StudentQuestionPreview from "../components/StudentQuestionPreview";
import AuthContext from "../context/AuthContext";

function CreateAssessment() {
    let {user} = useContext(AuthContext)
    let {knowShowRequired, setKnowShowRequired, knowShowSatisfied, questionObjList} = useContext(CreateAssessmentContext)
    let {selectedStandard} = useContext(StandardContext)
    let [knowShow, setKnowShow] = useState([])

    useEffect(()=> {
        if (!(selectedStandard.id == null) && !(selectedStandard.id === knowShowRequired.standard) && !(knowShowRequired.standard == null)) {
            setKnowShowRequired({id: null, content: {know: [], show: []}, standard: null})
        } else {
            return null
        }
    })

    const handlePost = async (e) => {
        if (window.confirm('Are you sure your Assessment is complete?')) {
            const serverURL = '/createassessment/'
            const response = await fetch(serverURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({questions: questionObjList, user: user, knowShow: knowShowRequired})
            });
            const data = await response;
            return data
        } else {
            e.preventDefault()
            return false
        }
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
                        <KnowShowButton key={chart.id} chart={chart} />
                    )))}
            <div className="grid sm:grid-cols-1 lg:grid-cols-2">
            {knowShowRequired.content.know.map(item => (
                    (knowShowSatisfied.includes(item))
                        ? <StudentQuestionPreview key={item} ksText={item}/>
                        : <AssessmentQuestion key={item} ksText={item} />
                ))
            }
            {knowShowRequired.content.show.map(item => (
                (knowShowSatisfied.includes(item))
                    ? <StudentQuestionPreview key={item} ksText={item}/>
                    : <AssessmentQuestion key={item} ksText={item} />
            ))
            }
            </div>
            {(knowShowRequired.id) && (knowShowRequired.content.know.every(item => (knowShowSatisfied.includes(item)))) && (knowShowRequired.content.show.every(item => (knowShowSatisfied.includes(item)))) &&
                <button onClick={handlePost} className={"p-2 bg-gray-400 rounded mb-4"}>They're all in there!</button>
            }
        </div>
    );
}

export default CreateAssessment;
