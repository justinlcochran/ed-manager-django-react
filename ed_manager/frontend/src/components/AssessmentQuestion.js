import React, {useContext, useState} from 'react';
import CreateAssessmentContext from "../context/CreateAssessmentContext";

function AssessmentQuestion({ksText}) {
    let {knowShowRequired, questionObjList, setQuestionObjList, knowShowSatisfied, setKnowShowSatisfied} = useContext(CreateAssessmentContext)
    let [questionText, setQuestionText] = useState(null)
    let [answers] = useState([
        {correct: true, text: ''},
        {correct: false, text: ''},
        {correct: false, text: ''},
        {correct: false, text: ''},
    ])

    const handleQuestionChange = (e) => {
        setQuestionText(e.target.value)
    }

    const handleAnswerChange = (e) => {
        answers[e.target.id].text = e.target.value
    }

    const handleRadioChange = (e) => {
        answers.forEach(function(item) {
            item.correct = parseInt(e.target.id) === answers.indexOf(item);
        })}

    let questionObj = {
        question: questionText, answers: answers, ks: ksText
    }

    let handleElementSave = () => {
        setKnowShowSatisfied([...knowShowSatisfied, ksText])
        setQuestionObjList([...questionObjList, questionObj])
    }


    return (
        <div>
            <div className="grid grid-cols-5 gap-4 p-8 my-4 mx-8 bg-gray-400 rounded-2xl">
                <div className=" col-span-1 rounded text-gray-700 max-h-fit">
                    <div className={"bg-amber-200 rounded p-4"}>{ksText}</div>

                </div>
                <div className="object-left bg-blue-300 col-span-3 rounded p-4 text-gray-700 text-left">
                    {(knowShowRequired.content.know.includes(ksText)) ?
                        <>
                            <p className={"my-2 text-2xl font-bold text-center"}>Question {knowShowRequired.content.know.indexOf(ksText) + 1}</p>
                            <textarea onChange={handleQuestionChange}
                                      placeholder={`Question ${knowShowRequired.content.know.indexOf(ksText) + 1}...`}
                                      className={"rounded w-full max-w-full h-36 p-4 col-span-5"} />
                            <div className={"text-left grid grid-cols-7"}>
                                <p className={"font-bold text-sm text-left text-green-800 col-span-1"}>Select Correct Answer:</p>
                                <p className={"font-bold text-sm text-center mt-5 text-green-800 col-span-6"}>Possible Answers</p>
                                {answers.map(item => (
                                    <React.Fragment key={`frag${answers.indexOf(item)}`}>
                                        <input name={`answer-select${ksText}`} type={'radio'} onChange={handleRadioChange}
                                               key={`selButton${answers.indexOf(item)}`} id={`${answers.indexOf(item)}`}
                                               className={"form-radio mr-2 h-4 w-4 text-green-500 justify-self-center my-auto"}/>
                                        <textarea id={answers.indexOf(item)} onChange={handleAnswerChange}
                                                  key={`textarea${answers.indexOf(item)}`}
                                                  placeholder={`Answer ${answers.indexOf(item) + 1}...`}
                                                  className={"rounded w-full max-w-full p-2 col-span-6 my-4 h-12"}/>
                                    </React.Fragment>))}
                            </div>
                        </>
                        :
                        <>
                            <p className={"my-2 text-2xl font-bold text-center"}>Question {knowShowRequired.content.know.length + knowShowRequired.content.show.indexOf(ksText) + 1}</p>
                            <textarea onChange={handleQuestionChange}
                                      placeholder={`Question ${knowShowRequired.content.know.length + knowShowRequired.content.show.indexOf(ksText) + 1}...`}
                                      className={"rounded w-full max-w-full h-36 p-4 col-span-5"} />
                            <div className={"text-left grid grid-cols-7"}>
                                <p className={"font-bold text-sm text-left text-green-800 col-span-1"}>Select Correct Answer:</p>
                                <p className={"font-bold text-sm text-center mt-5 text-green-800 col-span-6"}>Possible Answers</p>
                                {answers.map(item => (
                                    <React.Fragment key={`frag${answers.indexOf(item)}`}>
                                            <input name={`answer-select${ksText}`} type={'radio'}
                                                   key={`selButton${answers.indexOf(item)}`}
                                                   className={"form-radio mr-2 h-4 w-4 text-green-500 justify-self-center my-auto"}/>
                                            <textarea id={answers.indexOf(item)} onChange={handleAnswerChange}
                                                  key={`textarea${answers.indexOf(item)}`}
                                                  placeholder={`Answer ${answers.indexOf(item) + 1}...`}
                                                  className={"rounded w-full max-w-full p-2 col-span-6 my-4 h-12"}/>
                                    </React.Fragment>))}
                            </div>
                        </>
                    }
                </div>
                <div className={"col-span-1 flex items-center"}>
                    <button onClick={handleElementSave} className={"bg-green-600 hover:animate-pulse text-gray-800 py-2 px-4 border border-gray-400 rounded-2xl h-max-1/4 min-h-min shadow"}>
                        <img alt='' src={"https://ucarecdn.com/a7c8cc96-9346-4201-a7ac-88f04a2c3770/SaveQuestion.png"} className="aspect-square max-h-full"/>
                    </button>

                </div>
            </div>
        </div>
    );
}

export default AssessmentQuestion;
