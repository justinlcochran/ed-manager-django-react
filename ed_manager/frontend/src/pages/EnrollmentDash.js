import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import HoverList from "../components/HoverList";

function EnrollmentDash(props) {
    let params = useParams()

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState(null);
    const [assessments, setAssessments] = useState(null);
    const [selectedAssessment, setSelectedAssessment] = useState(null)

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
                body: JSON.stringify({assessmentId: selectedAssessment, enrollmentId: params.enrollmentId, user: user})
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
                {items['students'].map(item => (
                    <p key={item['firstname']}>{item['firstname']}</p>))}
                <div className={'grid-cols-3'}>
                    <p>Choose Assessment:</p>
                    <select className={"text-gray-600 text-2xl rounded"} defaultValue={'1'}
                            onChange={handleAssessmentSelect} id="topicsDropDown"
                            name="topicsDropDown">
                        <option disabled value="1">Assessments...</option>
                        {(assessments) && assessments.map(item => <option key={item.id}
                                                                            value={item.id}>{item['title']}</option>)}
                    </select>
                    <div className={'p-4 bg-amber-300'} onClick={handleAssignAssessment}>
                        Assign Assessment
                    </div>
                </div>

            </div>
        );
    }
}

export default EnrollmentDash;