import React, {createContext, useState} from 'react';

const CreateAssessmentContext = createContext()

export default CreateAssessmentContext

export const CreateAssessmentProvider = ({children}) => {

    const [assessment, setAssessment] = useState({
        knowShowChart: null,
        title: null,
    })

    const [questionObj, setQuestionObj] = useState(null)

    return (
        <CreateAssessmentContext.Provider value={children}>
            {children}
        </CreateAssessmentContext.Provider>
    );
}
