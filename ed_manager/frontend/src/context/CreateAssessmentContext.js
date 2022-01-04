import React, {createContext, useState} from 'react';

const CreateAssessmentContext = createContext()

export default CreateAssessmentContext

export const CreateAssessmentProvider = ({children}) => {

    const [assessment, setAssessment] = useState({
        knowShowChart: null,
        title: null,
    })
    const [standard, setStandard] = useState({id: null, code: null, text:'Choose a Standard', subject:null})
    const [knowShowRequired, setKnowShowRequired] = useState(null)
    const [knowShowSatisfied, setKnowShowSatisfied] = useState(null)
    const [questionObj, setQuestionObj] = useState(null)

    let contextData = {
        assessment: assessment,
        questionObj: questionObj,
        standard: standard,
        knowShowRequired: knowShowRequired,
        knowShowSatisfied: knowShowSatisfied,

        setAssessment: setAssessment,
        setQuestionObj: setQuestionObj,
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
