import React from 'react';
import TeacherCreateOption from "../components/TeacherCreateOption";

function TeacherCreate(props) {
    const currentPath = window.location.pathname
    return (
        <div>
            <table className={'options-table'}>
                <tbody>
                    <tr >
                        <TeacherCreateOption name={`${currentPath}/knowShowChart`} img_source={'https://ucarecdn.com/926942c0-0b7a-46f0-ac60-a1ef13090620/KnowShowChart.png'} />
                        <TeacherCreateOption name={`${currentPath}/knowShowSelector`} img_source={'https://ucarecdn.com/7ba4632e-3319-4153-8ce2-31ca33582832/Assessment.png'} />
                        <TeacherCreateOption name={`${currentPath}/enrollment`} img_source={'https://ucarecdn.com/1ccd698a-3f15-452d-a52e-45b245338dc1/Enrollments.png'} />
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TeacherCreate;
