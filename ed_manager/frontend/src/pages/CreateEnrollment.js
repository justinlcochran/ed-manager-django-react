import React, {useContext, useState} from 'react';
import AuthContext from "../context/AuthContext";

function CreateEnrollment() {
    let {user} = useContext(AuthContext)
    let [animate, setAnimate] = useState(false)
    let [enrollment, setEnrollment] = useState({topic: null, standardSet: null, name: ''})

    let topicsArr = ['English', 'Mathematics', 'Science','Social Studies', 'Elective']
    let fakeStandardSets = [{title: 'CCSS Algebra 1', grade: 9}, {title: 'CCSS English 9', grade: 9}]

    const handleTopicSelect = (e) => {
        let newEnrollment = {...enrollment}
        newEnrollment.topic = e.target.value
        setEnrollment(newEnrollment)
    }
    const handleStandardSetSelect = (e) => {
        let newEnrollment = {...enrollment}
        newEnrollment.standardSet = fakeStandardSets.find(item => (item.title === e.target.value))
        setEnrollment(newEnrollment)
    }

    const handleTitleChange = (e) => {
        let newEnrollment = {...enrollment}
        newEnrollment.name = e.target.value
        setEnrollment(newEnrollment)
    }


    return (
        <div className={"grid grid-cols-2"}>
            <div className={"mt-4 grid grid-rows-auto gap-4 mx-4"}>
                <textarea placeholder={"Title your enrollment ..."} onChange={handleTitleChange}/>
                <select className={"text-gray-600 text-2xl rounded w-30"} defaultValue={'1'} onChange={handleTopicSelect} id="topicsDropDown"
                        name="topicsDropDown">
                    <option disabled value="1">Select a Topic</option>
                    {topicsArr.map(item => <option key={item} value={item}>{item}</option>)}
                </select>
                <select className={"text-gray-600 text-2xl rounded"} defaultValue={'1'} onChange={handleStandardSetSelect} id="topicsDropDown"
                        name="topicsDropDown">
                    <option disabled value="1">Select a Standard Set</option>
                    {fakeStandardSets.map(item => <option key={item.title} value={item.title}>{`${item.grade} | ${item.title}`}</option>)}
                </select>

            </div>
            <div className={"bg-blue-300 rounded-2xl mt-4 mx-4"} id={"anim-div"}>
                {(enrollment.name) && <p className={"my-4 text-3xl font-bold text-gray-700"}>{enrollment.name}</p>}
                <p className={"my-4 text-3xl font-bold text-gray-700"}>{enrollment.topic}</p>
                {(enrollment.standardSet) && <p className={"my-4 text-3xl font-bold text-gray-700"}>{`${enrollment.standardSet.grade}th Grade: ${enrollment.standardSet.title}`}</p>}
            </div>
        </div>
    );
}

export default CreateEnrollment;
