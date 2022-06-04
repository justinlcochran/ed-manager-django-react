import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../context/AuthContext";
import HoverList from "../components/HoverList";

function CreateEnrollment() {
    let {user} = useContext(AuthContext)
    let [enrollment, setEnrollment] = useState({subject: null, standardSet: null, name: ''})
    let [isLoaded, setIsLoaded] = useState(null)
    let [error, setError] = useState(null)
    let [standardSets, setStandardSets] = useState(null)
    let [remainingStudents, setRemainingStudents] = useState([])
    let [selectedStudents, setSelectedStudents] = useState([])
    let [allStudents, setAllStudents] = useState([]);
    let [filter, setFilter] = useState({text: null});


    let subjectsArr = ['English', 'Mathematics', 'Science', 'Social Studies', 'Elective']

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/standardset/")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setStandardSets(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/studentlist/")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAllStudents(result)
                    setRemainingStudents(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    let [filteredStudents, setFilteredStudents] = useState(remainingStudents);

    let handleGreenClick = (e) => {
        let newStudent = allStudents.find(item => item.id == e.target.id)
        setRemainingStudents(remainingStudents.filter(item => item.id != e.target.id))
        setSelectedStudents([...selectedStudents, newStudent])

    }

    let handleRedClick = (e) => {
        let removeStudent = allStudents.find(item => item.id == e.target.id)
        setSelectedStudents(selectedStudents.filter(item => item.id != e.target.id))
        setRemainingStudents([...remainingStudents, removeStudent])
    }

    const handleSubjectSelect = (e) => {
        let newEnrollment = {...enrollment}
        newEnrollment.subject = e.target.value
        setEnrollment(newEnrollment)
    }
    const handleStandardSetSelect = (e) => {
        let newEnrollment = {...enrollment}
        newEnrollment.standardSet = standardSets.find(item => (item.title === e.target.value))
        setEnrollment(newEnrollment)
    }

    const handleTitleChange = (e) => {
        let newEnrollment = {...enrollment}
        newEnrollment.name = e.target.value
        setEnrollment(newEnrollment)
    }

    const handleFilterChange = (e) => {
        let newFilter = filter
        newFilter.text = e.target.value;
        setFilteredStudents(remainingStudents.filter(student => student.first_name.toLowerCase().includes(newFilter.text.toLowerCase())))
    }

    const handleSubmitEnrollment = async (e) => {
        if (window.confirm('Create a new enrollment?')) {
            const serverURL = '/createenrollment/'
            const response = await fetch(serverURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title: enrollment.name, subject: enrollment.subject, standardSet: enrollment.standardSet, students: selectedStudents, user: user})
            });
            const data = await response;
            return data
        } else {
            e.preventDefault()
            return false
        }
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
                            onChange={handleSubjectSelect} id="topicsDropDown"
                            name="topicsDropDown">
                        <option disabled value="1">Select a Topic</option>
                        {subjectsArr.map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                    <select className={"text-gray-600 text-2xl rounded"} defaultValue={'1'}
                            onChange={handleStandardSetSelect} id="topicsDropDown"
                            name="topicsDropDown">
                        <option disabled value="1">Select a Standard Set</option>
                        {(standardSets) && standardSets.map(item => <option key={item.title}
                                                          value={item.title}>{`${item.grade} | ${item.title}`}</option>)}
                    </select>

                </div>
                <div className={"bg-blue-300 rounded-2xl mt-4 mx-4"} id={"anim-div"}>
                    {(enrollment.name) && <p className={"my-4 text-3xl font-bold text-gray-700"}>{enrollment.name}</p>}
                    <p className={"my-4 text-3xl font-bold text-gray-700"}>{enrollment.subject}</p>
                    {(enrollment.standardSet) &&
                        <p className={"my-4 text-3xl font-bold text-gray-700"}>{`${enrollment.standardSet.grade}th Grade: ${enrollment.standardSet.title}`}</p>}
                </div>
                <div className={"col-span-2 my-2"}>
                    <p className={'col-span-1'}>Filter:</p>
                    <textarea className={'col-span-1'} onChange={handleFilterChange} />
                    <p className={"text-2xl font-bold"}>Add Students:</p>
                    <div className={"grid grid-cols-2 grid-rows-2"}>
                        {(!filter.text) && <HoverList className={"col-span-1"} list={remainingStudents} color="bg-green-600" handleClick={handleGreenClick} />}
                        {(filter.text) && <HoverList className={"col-span-1"} list={filteredStudents} color="bg-green-600" handleClick={handleGreenClick} />}
                        <HoverList className={"col-span-1"} list={selectedStudents} color="bg-red-600" handleClick={handleRedClick} />
                    </div>
                </div>
                <button onClick={handleSubmitEnrollment} className={"col-span-2 my-5 bg-amber-300 mx-8 text-xl font-bold text-gray-700"}>Submit</button>
            </div>
        );
    }
}

export default CreateEnrollment;
