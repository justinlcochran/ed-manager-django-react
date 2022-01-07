import React, {useContext} from 'react';
import CreateAssessmentContext from "../context/CreateAssessmentContext";

function StudentQuestionPreview({ksText}) {
    let {questionObjList, setQuestionObjList, knowShowSatisfied, setKnowShowSatisfied} = useContext(CreateAssessmentContext)

    let questionData = questionObjList.find(item => (item.ks === ksText))

    const handleEditClick = () => {
        var filteredSatisfied = knowShowSatisfied.filter((item) => {return item !== ksText })
        setKnowShowSatisfied(filteredSatisfied)
        setQuestionObjList(questionObjList.filter((item)=>{return item.ks !== ksText}))
    }



    return (
        <div>
            <div className="grid grid-cols-5 gap-4 p-8 my-4 mx-8 bg-orange-300 rounded-2xl ">
                <div className=" col-span-1 rounded text-gray-700 max-h-fit">
                    <div className={"bg-amber-200 rounded p-4"}>{questionData.ks}</div>

                </div>
                <div className="object-left bg-blue-300 col-span-3 rounded p-4 text-gray-700 text-left">
                        <>
                            <p className={"mb-2 text-2xl font-bold text-center"}>{questionData.question}</p>

                            <div>
                                {questionData.answers.map(item => (
                                    (item.correct)
                                    ? <React.Fragment key={`frag${questionData.answers.indexOf(item)}`}>
                                            <label className={"grid grid-cols-8 cursor-pointer my-3"}>
                                                <div key={`buttonContainerDiv${questionData.answers.indexOf(item)}`}
                                                     className={"col-span-1 max-w-full flex items-center justify-self-end"}>
                                                    <input name={`${ksText}`} type={'radio'}
                                                           key={`selButton${questionData.answers.indexOf(item)}`}
                                                           className={"form-radio mr-4 h-4 w-4 text-violet-500"}/>
                                                </div>
                                                <div className={"bg-lime-400 col-span-7 rounded-lg p-2"}>
                                                    <p className={"text-center text-lg font-bold text-gray-700"}>{item.text}</p>
                                                </div>
                                            </label>
                                        </React.Fragment>

                                    : <React.Fragment key={`frag${questionData.answers.indexOf(item)}`}>
                                            <label className={"grid grid-cols-8 cursor-pointer my-3"}>
                                                <div key={`buttonContainerDiv${questionData.answers.indexOf(item)}`}
                                                     className={"col-span-1 max-w-full flex items-center justify-self-end"}>
                                                    <input name={`${ksText}`} type={'radio'}
                                                           key={`selButton${questionData.answers.indexOf(item)}`}
                                                           className={"form-radio mr-4 h-4 w-4 text-violet-500"}/>
                                                </div>
                                                <div className={"bg-red-300 col-span-7 rounded-lg p-2 "}>
                                                    <p className={"text-center text-lg font-bold text-gray-700 "}>{item.text}</p>
                                                </div>
                                            </label>

                                    </React.Fragment>))}
                            </div>
                        </>

                </div>
                <div className={"col-span-1 flex items-center"}>
                    <button onClick={handleEditClick} className={"bg-violet-400 hover:animate-pulse text-gray-800 py-2 px-4 border border-gray-400 rounded-2xl h-max-1/4 min-h-min shadow"}>
                        <img alt='' src={"https://ucarecdn.com/236722a9-1a72-48b8-b17c-4f80632f912f/EditQuestion.png"} className="aspect-square max-h-full"/>
                    </button>

                </div>
            </div>
        </div>
    );
}

export default StudentQuestionPreview;