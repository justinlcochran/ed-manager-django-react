import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import AuthContext from "../context/AuthContext";

function EnrollmentDash(props) {
    let params = useParams()

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

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
                    setItems(result);
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



    return (
        <div>
            <ul>{items.map(item => (
                <li key={item.id}>
                    {item.title}: {item.subject} { item.teachers }
                </li>
            ))}
            </ul>
        </div>
    );
}

export default EnrollmentDash;