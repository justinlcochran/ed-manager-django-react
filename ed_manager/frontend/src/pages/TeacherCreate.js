import React from 'react';
import TeacherCreateOption from "../components/TeacherCreateOption";

function TeacherCreate(props) {
    const currentPath = window.location.pathname
    return (
        <div className={"flex gap-14 justify-center m-6"}>
            <TeacherCreateOption name={`${currentPath}/knowShowChart`} img_source={'https://ucarecdn.com/926942c0-0b7a-46f0-ac60-a1ef13090620/KnowShowChart.png'} />
            <TeacherCreateOption name={`${currentPath}/assessment`} img_source={'https://ucarecdn.com/7ba4632e-3319-4153-8ce2-31ca33582832/Assessment.png'} />
            <TeacherCreateOption name={`${currentPath}/enrollment`} img_source={'https://ucarecdn.com/1ccd698a-3f15-452d-a52e-45b245338dc1/Enrollments.png'} />
        </div>
    );
}

export default TeacherCreate;
