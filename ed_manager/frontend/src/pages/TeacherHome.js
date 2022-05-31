import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";

function TeacherHome(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    let user = useContext(AuthContext)
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch(`/teacherdashboard/${user.user.user_id}`)
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

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <p className={"my-4 mx-4 text-3xl font-bold text-gray-200"}>My Enrollments:</p>
            <div className={'grid grid-cols-4'}>
                {items.map(item => (
                    <Link to={`/enrollmentdash/${item.id}`} key={`${item.id}`}> <div className={"col-span-1 bg-blue-300 hover:bg-blue-500 rounded-2xl py-5 mt-4 mx-4"} id={"anim-div"}>
                        {(item.title) && <p className={"my-4 mx-4 text-3xl font-bold text-gray-700"}>{item.title}</p>}
                    </div></Link>
                    // <li key={item.id}>
                    //     {item.title}: {item.subject}
                    // </li>
                ))}
            </div>
            </div>
        );
    }
}

export default TeacherHome;