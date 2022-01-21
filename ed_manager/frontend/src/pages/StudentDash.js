import React, {useContext} from 'react';
import { Bar } from 'react-chartjs-2';
import AuthContext from "../context/AuthContext";

function StudentDash(props) {
    let {user} = useContext(AuthContext)

    return (
        <div className={"bg-gray-700 h-screen w-full"}>
            <div className={"grid grid-cols-12 p-8 gap-4"}>
                <div className={"rounded-2xl bg-blue-300 col-span-6 text-gray-700 font-bold text-4xl p-2"}>
                    Hello, {user.name}!
                </div>
                <div className={"rounded-2xl bg-violet-300 col-span-6 text-gray-700 pl-8 p-2 text-left"}>
                    <ul>
                        <li>Test in Eng</li>
                        <li>Test in Math</li>
                        <li>Test in Science</li>
                        <li>Completed: Test in Social Studies</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default StudentDash;
