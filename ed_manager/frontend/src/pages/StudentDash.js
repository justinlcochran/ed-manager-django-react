import React, {useContext, useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";

function StudentDash(props) {
    let {user} = useContext(AuthContext)
    const [isLoaded, setIsLoaded] = useState(null)
    const [error, setError] = useState(null)
    const [dataEntries, setDataEntries] = useState(null)

    useEffect( () => {
        fetch(`/studentdashboard/${user.user_id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setDataEntries(JSON.parse(result));
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

    console.log(dataEntries)

    return (
        <div className={"bg-gray-700 h-screen w-full"}>
            <div className={"grid grid-cols-12 p-8 gap-4"}>
                <div className={"rounded-2xl bg-blue-300 col-span-6 text-gray-700 font-bold text-4xl p-2"}>
                    Hello, {user.name}!
                </div>
                <div className={"rounded-2xl bg-violet-300 col-span-6 text-gray-700 pl-8 p-2 text-left"}>
                </div>
            </div>
            <div className={"grid grid-cols-4 p-8 gap-4"}>
                {(dataEntries) && dataEntries.assessments.map(entry =>
                    <Link to={`/takeassessment/${entry.id}`} key={`${entry.id}`}> <div className={"col-span-1 bg-blue-300 hover:bg-blue-500 rounded-2xl py-5 mt-4 mx-4"} id={"anim-div"}>
                        {(entry.title) && <p className={"my-4 mx-4 text-3xl font-bold text-gray-700"}>{entry.title}</p>}
                    </div></Link>)}

            </div>

            <div className={"grid grid-cols-4 p-8 gap-4 bg-gray-600"}>
                <p className={"text-2xl font-bold col-span-4"}>Recent Results:</p>
                {(dataEntries) && dataEntries.results.map(entry =>
                    <div className={"col-span-1 bg-gray-300 hover:bg-gray-500 rounded-2xl py-5 mt-4 mx-4"} id={"anim-div"}>
                        {(entry.title) && <p className={"my-4 mx-4 text-3xl font-bold text-gray-700"}>{entry.title}</p>}
                        <div className={`grid grid-cols-${entry.results.length}`}>
                            {entry.results.map(item =>
                                (item.score) ? <div className={"col-span-1 mx-2 p-4 bg-green-500 rounded"}></div> : <div className={"col-span-1 mx-2 p-4 bg-red-500 rounded"}></div>)}
                        </div>
                    </div>)}

            </div>
        </div>
    );
}

export default StudentDash;
