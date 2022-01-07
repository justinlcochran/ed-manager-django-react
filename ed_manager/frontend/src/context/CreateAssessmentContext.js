import React, {createContext, useState} from 'react';

const CreateAssessmentContext = createContext()

export default CreateAssessmentContext

export const CreateAssessmentProvider = ({children}) => {

    const [assessment, setAssessment] = useState({
        knowShowChart: null,
        title: null,
    })
    const [standard, setStandard] = useState({id: null, code: null, text:'Choose a Standard', subject:null})
    const [knowShowRequired, setKnowShowRequired] = useState({id: null, content: {know: [], show: []}, standard: null})
    const [knowShowSatisfied, setKnowShowSatisfied] = useState([])
    const [questionObjList, setQuestionObjList] = useState([])

    let contextData = {
        assessment: assessment,
        questionObjList: questionObjList,
        standard: standard,
        knowShowRequired: knowShowRequired,
        knowShowSatisfied: knowShowSatisfied,

        setAssessment: setAssessment,
        setQuestionObjList: setQuestionObjList,
        setStandard: setStandard,
        setKnowShowRequired: setKnowShowRequired,
        setKnowShowSatisfied: setKnowShowSatisfied,
    }

    return (
        <CreateAssessmentContext.Provider value={contextData}>
            {children}
        </CreateAssessmentContext.Provider>
    );
}
