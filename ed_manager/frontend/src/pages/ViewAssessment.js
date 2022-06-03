import React, {useContext, useEffect, useState} from 'react';
import QuestionInterface from "../components/QuestionInterface";
import AuthContext from "../context/AuthContext";
import {useParams} from "react-router-dom";

function ViewAssessment() {
    const [assessmentData, setAssessmentData] = useState(null)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [studentResponse, setStudentResponse] = useState([])

    const user = useContext(AuthContext)

    let params = useParams()
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch(`/getassessment/${params.assessmentId}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAssessmentData(JSON.parse(result));
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

    let handleResultsSubmit = async (e) => {
        if (window.confirm('Are you sure you would like to submit your answers? You cannot edit once you have submitted.')) {
            const serverURL = '/updatestudentdataentry/1'
            const response = await fetch(serverURL, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({assessmentId: assessmentData['assessmentId'], studentResponse: studentResponse , user: user})
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
            <>
                <div className={"grid sm:grid-cols-1 lg:grid-cols-2"}>
                {(assessmentData) && assessmentData['questions'].map(item => (
                    <QuestionInterface questionObj={item} studentResponse={studentResponse} setStudentResponse={setStudentResponse}/>
                ))}
                </div>
                <div className={'bg-amber-700 p-9'} onClick={handleResultsSubmit}>Submit</div>
            </>
        );
    }
}

export default ViewAssessment;
