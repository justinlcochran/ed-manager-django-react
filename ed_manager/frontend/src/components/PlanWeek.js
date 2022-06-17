import React, {useContext, useState} from 'react';
import StandardContext from "../context/StandardContext";
import {useNavigate} from "react-router-dom";

function PlanWeek({weekData, assessments, weekIndex, setWeekIndex}) {
    let navigate = useNavigate()
    let monday = weekData.daily_know_show.monday
    let tuesday = weekData.daily_know_show.tuesday
    let wednesday = weekData.daily_know_show.wednesday
    let thursday = weekData.daily_know_show.thursday
    let friday = weekData.daily_know_show.friday

    let handleBackWeek = () => {
        setWeekIndex(weekIndex-1)
    }

    let handleForwardWeek = () => {
        setWeekIndex(weekIndex+1)
    }

    let handleFormativeClick = () => {
        let path = `/viewassessment/${weekData.formative[0]}`
        navigate(path)
    }

    let {allStandards, selectedStandard, setSelectedStandard, error, isLoaded} = useContext(StandardContext)

    return (
        <div>
            <div className={"p-4 bg-blue-900 rounded m-8"} key={`${weekData.standard_set}`}>
                <div className={"grid grid-cols-3 my-4"}>
                    {(weekIndex < 1) ?
                        <div className={"bg-gray-500 w-8 mx-auto rounded-xl"}>
                            <p className={"text-blue-900 text-2xl font-bold pb-1 align-middle select-none"}> &lt; </p>
                        </div>
                        :
                        <div className={"bg-blue-500 hover:bg-blue-400 cursor-pointer w-8 mx-auto rounded-xl"} onClick={handleBackWeek}>
                            <p className={"text-blue-900 text-2xl font-bold pb-1 align-middle select-none"}> &lt; </p>
                        </div>}
                    <p className={"text-2xl font-bold"}>Week {weekIndex+1}</p>
                    <div className={"bg-blue-500 hover:bg-blue-400 cursor-pointer w-8 mx-auto rounded-xl"} onClick={handleForwardWeek}>
                        <p className={"text-blue-900 text-2xl font-bold pb-1 align-middle select-none"}> &gt; </p>
                    </div>
                </div>

            <div className={"bg-yellow-200"}>
                <p className={"text-gray-800"}>{allStandards.find(item => item.id == weekData.standard).code}: {allStandards.find(item => item.id == weekData.standard).text}</p>
                {weekData.formative.map(item => <p key={item} className={"text-gray-800"}>Formative: {assessments.find(assessment => assessment.id == item).title}</p>)}

            </div>
            <div className={"grid grid-cols-5 mt-4"}>
                <div className={"border-4"}>
                    <p className={'text-2xl font-bold border-b-2'}>Monday</p>
                    <div>
                        {monday.map(item => (item == "Formative Assessment")
                            ?
                            <div key={item} className={"rounded-full bg-red-700 p-4 hover:bg-red-600 cursor-pointer"} onClick={handleFormativeClick}>
                                <p className={"text-gray-200 select-none font-bold text-2xl"}
                                   id={item}>{item}</p>
                            </div>
                            :
                            <div key={item} className={"rounded m-2 bg-green-700 "}>
                                <p className={"text-gray-200 select-none text-lg p-2"}
                                   id={item}>{item}</p>
                            </div>)}
                    </div>
                </div>
                <div className={"border-4"}>
                    <p className={'text-2xl font-bold border-b-2'}>Tuesday</p>
                    <div>
                        {tuesday.map(item => (item == "Formative Assessment")
                            ?
                            <div key={item} className={"rounded-full bg-red-700 p-4 hover:bg-red-600 cursor-pointer"} onClick={handleFormativeClick}>
                                <p className={"text-gray-200 select-none font-bold text-2xl"}
                                   id={item}>{item}</p>
                            </div>
                            :
                            <div key={item} className={"rounded m-2 bg-green-700 "}>
                                <p className={"text-gray-200 select-none text-lg p-2"}
                                   id={item}>{item}</p>
                            </div>)}
                    </div>
                </div>
                <div className={"border-4"}>
                    <p className={'text-2xl font-bold border-b-2'}>Wednesday</p>
                    <div>
                        {wednesday.map(item => (item == "Formative Assessment")
                            ?
                            <div key={item} className={"rounded-full bg-red-700 p-4 hover:bg-red-600 cursor-pointer"} onClick={handleFormativeClick}>
                                <p className={"text-gray-200 select-none font-bold text-2xl"}
                                   id={item}>{item}</p>
                            </div>
                            :
                            <div key={item} className={"rounded m-2 bg-green-700 "}>
                                <p className={"text-gray-200 select-none text-lg p-2"}
                                   id={item}>{item}</p>
                            </div>)}
                    </div>
                </div>
                <div className={"border-4"}>
                    <p className={'text-2xl font-bold border-b-2'}>Thursday</p>
                    <div>
                        {thursday.map(item => (item == "Formative Assessment")
                            ?
                            <div key={item} className={"rounded-full bg-red-700 p-4 hover:bg-red-600 cursor-pointer"} onClick={handleFormativeClick}>
                                <p className={"text-gray-200 select-none font-bold text-2xl"}
                                   id={item}>{item}</p>
                            </div>
                            :
                            <div key={item} className={"rounded m-2 bg-green-700 "}>
                                <p className={"text-gray-200 select-none text-lg p-2"}
                                   id={item}>{item}</p>
                            </div>)}
                    </div>
                </div>
                <div className={"border-4"}>
                    <p className={'text-2xl font-bold border-b-2'}>Friday</p>
                    <div>
                        {friday.map(item => (item == "Formative Assessment")
                            ?
                            <div key={item} className={"rounded-full bg-red-700 p-4 hover:bg-red-600 cursor-pointer"} onClick={handleFormativeClick}>
                                <p className={"text-gray-200 select-none font-bold text-2xl"}
                                   id={item}>{item}</p>
                            </div>
                            :
                            <div key={item} className={"rounded m-2 bg-green-700 "}>
                                <p className={"text-gray-200 select-none text-lg p-2"}
                                   id={item}>{item}</p>
                            </div>)}
                    </div>
                </div>
            </div>

        </div>
    </div>
    );
}

export default PlanWeek;