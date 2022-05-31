import React, {useEffect, useState} from 'react';
import HoverList from "../components/HoverList";

function Assign(props) {

    let [isloaded, setIsLoaded] = useState();
    let [error, setError] = useState();
    let [allStudents, setAllStudents] = useState([]);
    let [remainingStudents, setRemainingStudents] = useState([])
    let [selectedStudents, setSelectedStudents] = useState([])

    let handleGreenClick = (e) => {
        let newStudent = allStudents.find(item => item.id === e.target.id)
        setRemainingStudents(remainingStudents.filter(item => item.id !== e.target.id))
        setSelectedStudents([...selectedStudents, newStudent])
    }

    let handleRedClick = (e) => {
        let removeStudent = allStudents.find(item => item.id === e.target.id)
        setSelectedStudents(selectedStudents.filter(item => item.id !== e.target.id))
        setRemainingStudents([...remainingStudents, removeStudent])
    }

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

    return (
        <div className={"grid grid-cols-2"}>
            <HoverList className={"col-span-1"} list={remainingStudents} color="bg-green-600" handleClick={handleGreenClick} />
            <HoverList className={"col-span-1"} list={selectedStudents} color="bg-red-600" handleClick={handleRedClick} />
        </div>
    );
}

export default Assign;