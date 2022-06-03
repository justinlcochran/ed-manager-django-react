import React from 'react';

function QuestionInterface({questionObj, studentResponse, setStudentResponse}) {

    const onRadioSelect = (e) => {
        if (studentResponse.some(item => item.question === questionObj.question)) {
            let newStudentResponse = studentResponse
            newStudentResponse.forEach((item) => {
                if (item.question === questionObj.question) {
                    item.response = e.target.id
                }
            setStudentResponse(newStudentResponse)
            })
            console.log(studentResponse)
        } else {
            let newResponse = {question: questionObj.question, response: e.target.id}
            setStudentResponse([...studentResponse, newResponse])
            console.log(studentResponse)
        }
    }

    return (
        <>
            <div className="grid grid-cols-5 gap-4 p-8 my-4 mx-8 bg-orange-300 rounded-2xl ">
                <div className=" col-span-1 rounded text-gray-700 max-h-fit">
                    <div className={"bg-amber-200 rounded p-4"}>{questionObj.ks}</div>

                </div>
                <div className="object-left bg-blue-300 col-span-3 rounded p-4 text-gray-700 text-left">
                    <>
                        <p className={"mb-2 text-2xl font-bold text-center"}>{questionObj.question}</p>

                        <div>
                            {questionObj.answers.map(item => (
                                (item.correct)
                                    ? <React.Fragment key={`frag${questionObj.answers.indexOf(item)}`}>
                                        <label className={"grid grid-cols-8 cursor-pointer my-3"}>
                                            <div key={`buttonContainerDiv${questionObj.answers.indexOf(item)}`}
                                                 className={"col-span-1 max-w-full flex items-center justify-self-end"}>
                                                <input name={`${questionObj.ks}`} id={`${item.text}`} type={'radio'}
                                                       key={`selButton${questionObj.answers.indexOf(item)}`}
                                                       className={"form-radio mr-4 h-4 w-4 text-violet-500"} onChange={onRadioSelect}/>
                                            </div>
                                            <div className={"bg-lime-400 col-span-7 rounded-lg p-2"}>
                                                <p className={"text-center text-lg font-bold text-gray-700"}>{item.text}</p>
                                            </div>
                                        </label>
                                    </React.Fragment>

                                    : <React.Fragment key={`frag${questionObj.answers.indexOf(item)}`}>
                                        <label className={"grid grid-cols-8 cursor-pointer my-3"}>
                                            <div key={`buttonContainerDiv${questionObj.answers.indexOf(item)}`}
                                                 className={"col-span-1 max-w-full flex items-center justify-self-end"}>
                                                <input name={`${questionObj.ks}`} id={`${item.text}`} type={'radio'}
                                                       key={`selButton${questionObj.answers.indexOf(item)}`}
                                                       className={"form-radio mr-4 h-4 w-4 text-violet-500"} onChange={onRadioSelect}/>
                                            </div>
                                            <div className={"bg-red-300 col-span-7 rounded-lg p-2 "}>
                                                <p className={"text-center text-lg font-bold text-gray-700 "}>{item.text}</p>
                                            </div>
                                        </label>

                                    </React.Fragment>))}
                        </div>
                    </>

                </div>
            </div>
        </>
    );
}

export default QuestionInterface;
