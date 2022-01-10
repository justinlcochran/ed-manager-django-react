import React, {useEffect, useState} from 'react';
import QuestionInterface from "../components/QuestionInterface";

function ViewAssessment() {
    const [assessmentData, setAssessmentData] = useState(null)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("/getassessment/")
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

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <div className={"grid sm:grid-cols-1 lg:grid-cols-2"}>
                {(assessmentData) && assessmentData['questions'].map(item => (
                    <QuestionInterface questionObj={item}/>
                ))}
            </div>
            </>
        );
    }
}

export default ViewAssessment;
