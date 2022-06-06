import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Datepicker from 'react-datepicker';
import HoverList from "../components/HoverList";
import 'react-datepicker/dist/react-datepicker.css'

function EnrollmentDash(props) {
    let params = useParams()

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState(null);
    const [assessments, setAssessments] = useState(null);
    const [selectedAssessment, setSelectedAssessment] = useState(null)
    const [dueDate, setDueDate] = useState(new Date());

    let user = useContext(AuthContext)
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch(`/enrollment/${params.enrollmentId}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(JSON.parse(result));
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

    useEffect( () => {
        fetch(`/assessment/`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAssessments(result);
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


    let handleAssessmentSelect = (e) => {
        setSelectedAssessment(e.target.value)
    }

    let handleAssignAssessment = async (e) => {
        if (window.confirm('Assign Formative Assessment?')) {
            const serverURL = '/createstudentdataentry/'
            const response = await fetch(serverURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({assessmentId: selectedAssessment, enrollmentId: params.enrollmentId, dueDate: dueDate, user: user})
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
    } else if (!items) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <div className={'grid grid-cols-2'}>
                    <div className={'col-span-1'}>
                    <p>Choose Assessment:</p>
                    <select className={"text-gray-600 text-2xl rounded"} defaultValue={'1'}
                            onChange={handleAssessmentSelect} id="topicsDropDown"
                            name="topicsDropDown">
                        <option disabled value="1">Assessments...</option>
                        {(assessments) && assessments.map(item => <option key={item.id}
                                                                            value={item.id}>{item['title']}</option>)}
                    </select>
                    </div>
                    <div className={'col-span-1 my-4'}>
                        <Datepicker classname={'text-black col-span-1 my-4'} selected={dueDate} onChange={(date:Date) => setDueDate(date)}/>
                    </div>
                    <div className={'p-4 bg-amber-300 mx-32 my-2 rounded-2xl hover:bg-amber-400 hover:cursor-pointer'} onClick={handleAssignAssessment}>
                        <p className={'text-black'}>Assign Assessment</p>
                    </div>
                </div>
                <div className={"bg-gray-500 grid grid-cols-5 p-2"}>
                    <div className={`bg-gray-400 m-2 grid grid-rows-${items.students.length+1}`}>
                        <p className={"text-xl mb-4"}>Students:</p>
                        {items.students.map(item => <p className={"my-2 border-b-2"}>{item.firstname}</p>)}
                    </div>
                    <div className={`col-span-4 grid grid-rows-${items.students.length+1} overflow-x-auto`}>

                        <div className={"w-40 p-1 grid grid-cols-3"}>
                            {items.standards.map(item => <p className={"col-span-3"}>{item.code}</p>)}

                                {
                                    items.students.map(item =>
                                        (item.scores.map(score => (Object.keys(score.result).length !== 0)
                                            ? <div className={`grid grid-cols-${score.result.length} col-span-3 py-2 mb-4 bg-gray-300`}> {score.result.map(item => (item.score) ?
                                            <div className={"col-span-1 mx-2 p-1 bg-green-500 rounded"}></div>
                                                :
                                            <div className={"col-span-1 mx-2 p-1 bg-red-500 rounded"}></div>)}
                                            </div>
                                            : <div className={"col-span-3 bg-gray-600 mb-4"}><p className={"mt-1"}>Incomplete</p></div>)))
                                }

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

export default EnrollmentDash;