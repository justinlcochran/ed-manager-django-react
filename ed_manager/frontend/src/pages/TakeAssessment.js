import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import QuestionInterface from "../components/QuestionInterface";
import AuthContext from "../context/AuthContext";

function TakeAssessment(props) {
    const params = useParams()
    const user = useContext(AuthContext)
    const [isLoaded, setIsLoaded] = useState(null)
    const [error, setError] = useState(null)
    const [assessmentData, setAssessmentData] = useState(null)
    const [studentResponse, setStudentResponse] = useState([])

    const navigate = useNavigate()

    useEffect( () => {
        fetch(`/getstudentassessment/${params.dataEntryId}`)
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
            const serverURL = `/updatestudentdataentry/${params.dataEntryId}`
            const response = await fetch(serverURL, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({dataEntryId: params.dataEntryId, assessmentId: assessmentData['assessmentId'], studentResponse: studentResponse , user: user})
            });
            const data = await response;
            navigate('/')
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

export default TakeAssessment;