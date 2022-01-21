import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../context/AuthContext";

function CreateEnrollment() {
    let {user} = useContext(AuthContext)
    let [enrollment, setEnrollment] = useState({topic: null, standardSet: null, name: ''})
    let [isLoaded, setIsLoaded] = useState(null)
    let [error, setError] = useState(null)
    let [standardSets, setStandardSets] = useState(null)

    let subjectsArr = ['English', 'Mathematics', 'Science', 'Social Studies', 'Elective']
    let fakeStandardSets = [{title: 'CCSS Algebra 1', grade: 9}, {title: 'CCSS English 9', grade: 9}]

    useEffect(() => {
        fetch("/standardset/")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setStandardSets(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

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

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={"grid grid-cols-2"}>
                <div className={"mt-4 grid grid-rows-auto gap-4 mx-4"}>
                    <textarea placeholder={"Title your enrollment ..."} onChange={handleTitleChange}/>
                    <select className={"text-gray-600 text-2xl rounded w-30"} defaultValue={'1'}
                            onChange={handleTopicSelect} id="topicsDropDown"
                            name="topicsDropDown">
                        <option disabled value="1">Select a Topic</option>
                        {subjectsArr.map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                    <select className={"text-gray-600 text-2xl rounded"} defaultValue={'1'}
                            onChange={handleStandardSetSelect} id="topicsDropDown"
                            name="topicsDropDown">
                        <option disabled value="1">Select a Standard Set</option>
                        {standardSets.map(item => <option key={item.title}
                                                          value={item.title}>{`${item.grade} | ${item.title}`}</option>)}
                    </select>

                </div>
                <div className={"bg-blue-300 rounded-2xl mt-4 mx-4"} id={"anim-div"}>
                    {(enrollment.name) && <p className={"my-4 text-3xl font-bold text-gray-700"}>{enrollment.name}</p>}
                    <p className={"my-4 text-3xl font-bold text-gray-700"}>{enrollment.topic}</p>
                    {(enrollment.standardSet) &&
                        <p className={"my-4 text-3xl font-bold text-gray-700"}>{`${enrollment.standardSet.grade}th Grade: ${enrollment.standardSet.title}`}</p>}
                </div>
            </div>
        );
    }
}

export default CreateEnrollment;
