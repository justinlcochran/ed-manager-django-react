import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";
import {ReactSortable} from "react-sortablejs";
import StandardSelector from "../components/StandardSelector";
import StandardContext from "../context/StandardContext";
import KnowShowButton from "../components/KnowShowButton";
import CreateAssessmentContext from "../context/CreateAssessmentContext";
import Datepicker from "react-datepicker";

function TeacherHome(props) {
    const [localError, setLocalError] = useState(null);
    const [localIsLoaded, setLocalIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [preps, setPreps] = useState(null);
    const [selectedPrep, setSelectedPrep] = useState(null)
    const [knowShow, setKnowShow] = useState([])
    const [knowShowOrder, setKnowShowOrder] = useState(null)
    let {
        knowShowRequired,
        setKnowShowRequired,
        knowShowSatisfied,
        questionObjList,
        assessment,
        setAssessment
    } = useContext(CreateAssessmentContext)
    const [monday, setMonday] = useState([])
    const [tuesday, setTuesday] = useState([])
    const [wednesday, setWednesday] = useState([])
    const [thursday, setThursday] = useState([])
    const [friday, setFriday] = useState([])
    const [weekIndex, setWeekIndex] = useState(1)
    const [startDate, setStartDate] = useState(new Date())
    const [assessments, setAssessments] = useState(null)
    const [selectedAssessment, setSelectedAssessment] = useState(null)
    let {allStandards, selectedStandard, setSelectedStandard, error, isLoaded} = useContext(StandardContext)

    let user = useContext(AuthContext)
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()

    let fillWeek = (data) => {
        setMonday(data.monday)
        setTuesday(data.tuesday)
        setWednesday(data.wednesday)
        setThursday(data.thursday)
        setFriday(data.friday)
    }

    useEffect(() => {
        fetch(`/teacherdashboard/${user.user.user_id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setLocalIsLoaded(true);
                    setItems(result);
                    setPreps(result.standardSets.filter(item => result.enrollments.map(item => item.standardSet).includes(item.id)))
                    setKnowShow(result.knowShowCharts)
                    console.log(result.planWeeks)
                    setAssessments(result.assessments)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setLocalIsLoaded(true);
                    setLocalError(error);
                }
            )
    }, [])

    useEffect(() => {
        if (!(selectedStandard.id == null) && !(selectedStandard.id === knowShowRequired.standard) && !(knowShowRequired.standard == null)) {
            setKnowShowRequired({id: null, content: {know: [], show: []}, standard: null})
        } else {
            return null
        }
    })

    let handlePrepClick = (e) => {
        setSelectedPrep(e.target.id)
    }

    let handleAssessmentSelect = (e) => {
        setSelectedAssessment(e.target.value)
    }

    let handleSaveWeek = async (e) => {
        const serverURL = '/saveweek/'
        const response = await fetch(serverURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dailyKnowShow: {
                    monday: monday,
                    tuesday: tuesday,
                    wednesday: wednesday,
                    thursday: thursday,
                    friday: friday
                }, weekIndex: weekIndex, standard: selectedStandard, standardSet: selectedPrep, startDate: startDate, user: user.user.user_id
            })
        });
        const data = await response;
        return data
    }

    let sortableList = [...knowShowRequired.content.know, ...knowShowRequired.content.show, "Formative Assessment"]

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                {(preps) && <div className={`mt-4 grid grid-cols-${preps.length} gap-4`}>
                    {preps.map(item =>

                        <div key={`${item.id}`}
                             className={`bg-purple-700 mx-4 rounded hover:bg-purple-600 cursor-pointer`}
                             onClick={handlePrepClick}>
                            <p id={`${item.id}`} className={'text-2xl font-bold p-4'}>{item.prep_title}</p>
                        </div>)}
                </div>}

                {(items.enrollments && selectedPrep) && <>
                    <div className={"p-4 bg-blue-900 rounded m-8"} key={`${selectedPrep}`}>
                        <div className={""}>
                            <p className={"text-left text-2xl font-bold"}>Week {weekIndex}</p>
                            <StandardSelector className={"col-span-3"} standardSet={selectedPrep}/>

                            {(!knowShowRequired.id) ? knowShow.map(chart => (
                                ((chart.standard === selectedStandard.id) &&
                                    <KnowShowButton key={chart.id} chart={chart}/>
                                ))) : <>
                                <select className={"text-gray-600 text-2xl rounded mb-4"} defaultValue={'1'}
                                        onChange={handleAssessmentSelect} id="topicsDropDown"
                                        name="topicsDropDown">
                                    <option disabled value="1">Assessments...</option>
                                    {(assessments) && assessments.filter(item => item.know_show_chart === knowShowRequired.id).map(item => <option key={item.id}
                                                                                      value={item.id}>{item['title']}</option>)}
                                </select>
                                <div className={"bg-blue-600 p-4 rounded"}>
                                <p className={"text-2xl font-bold text-left"}>Know-Show Bank</p>
                                <ReactSortable list={sortableList} setList={setKnowShowOrder}
                                               className={"grid-container mt-4"} group={1}>
                                    {sortableList.map(item =>
                                        (item === "Formative Assessment") ?
                                            <div className={"rounded-full bg-red-700 p-4 cursor-grab"}>
                                                <p className={"text-gray-200 select-none font-bold text-2xl h-auto align-middle mt-12"}
                                                   id={item}>{item}</p>
                                            </div>
                                            :
                                            <div className={"rounded bg-amber-200 p-4 cursor-grab"}>
                                                <p className={"py-2 text-gray-800 align-middle select-none"}
                                                   id={item}>{item}</p>
                                            </div>
                                    )}
                                </ReactSortable>
                            </div></>}
                            <div className={"grid grid-cols-5 mt-6 bg-green-600"}>
                                <div className={"border-4"}>
                                    <div className={"grid grid-cols-5"}><p className={'col-span-3 text-2xl ml-4 font-bold border-b-2'}>Monday:</p>
                                        <Datepicker value={startDate} className={"col-span-2 rounded h-8 w-28 cursor-pointer"} selected={startDate} onChange={(date:Date) => setStartDate(date)}></Datepicker></div>

                                    <ReactSortable list={monday} setList={setMonday} group={1}>
                                        {monday.map(item =>
                                            (item == "Formative Assessment") ?
                                                <div className={"rounded-full bg-red-700 p-4 cursor-grab"}>
                                                    <p className={"text-gray-200 select-none font-bold text-2xl"}
                                                       id={item}>{item}</p>
                                                </div>
                                                :
                                                <div className={"rounded-2xl bg-amber-200 m-2 p-2 cursor-grab"}>
                                                    <p className={"text-gray-800 font-bold py-4"}>{item}</p>
                                                </div>)}
                                    </ReactSortable>
                                </div>
                                <div className={"border-4"}>
                                    <p className={'text-2xl font-bold border-b-2'}>Tuesday</p>
                                    <ReactSortable list={tuesday} setList={setTuesday} group={1}>
                                        {tuesday.map(item =>
                                            (item == "Formative Assessment") ?
                                                <div className={"rounded-full bg-red-700 p-4 cursor-grab"}>
                                                    <p className={"text-gray-200 select-none font-bold text-2xl"}
                                                       id={item}>{item}</p>
                                                </div>
                                                :
                                                <div className={"rounded-2xl bg-amber-200 m-2 p-2 cursor-grab"}>
                                                    <p className={"text-gray-800 font-bold py-4"}>{item}</p>
                                                </div>)}
                                    </ReactSortable>
                                </div>
                                <div className={"border-4"}>
                                    <p className={'text-2xl font-bold border-b-2'}>Wednesday</p>
                                    <ReactSortable list={wednesday} setList={setWednesday} group={1}>
                                        {wednesday.map(item =>
                                            (item == "Formative Assessment") ?
                                                <div className={"rounded-full bg-red-700 p-4 cursor-grab"}>
                                                    <p className={"text-gray-200 select-none font-bold text-2xl"}
                                                       id={item}>{item}</p>
                                                </div>
                                                :
                                                <div className={"rounded-2xl bg-amber-200 m-2 p-2 cursor-grab"}>
                                                    <p className={"text-gray-800 font-bold py-4"}>{item}</p>
                                                </div>)}
                                    </ReactSortable>
                                </div>
                                <div className={"border-4"}>
                                    <p className={'text-2xl font-bold border-b-2'}>Thursday</p>
                                    <ReactSortable list={thursday} setList={setThursday} group={1}>
                                        {thursday.map(item =>
                                            (item == "Formative Assessment") ?
                                                <div className={"rounded-full bg-red-700 p-4 cursor-grab"}>
                                                    <p className={"text-gray-200 select-none font-bold text-2xl"}
                                                       id={item}>{item}</p>
                                                </div>
                                                :
                                                <div className={"rounded-2xl bg-amber-200 m-2 p-2 cursor-grab"}>
                                                    <p className={"text-gray-800 font-bold py-4"}>{item}</p>
                                                </div>)}
                                    </ReactSortable>

                                </div>
                                <div className={"border-4"}>
                                    <p className={'text-2xl font-bold border-b-2'}>Friday</p>
                                    <div className={"h-60"}>
                                        <ReactSortable list={friday} setList={setFriday} group={1}>
                                            {friday.map(item =>
                                                (item == "Formative Assessment") ?
                                                    <div className={"rounded-full bg-red-700 p-4 cursor-grab"}>
                                                        <p className={"text-gray-200 select-none font-bold text-2xl"}
                                                           id={item}>{item}</p>
                                                    </div>
                                                    :
                                                    <div className={"rounded-2xl bg-amber-200 m-2 p-2 cursor-grab"}>
                                                        <p className={"text-gray-800 font-bold py-4"}>{item}</p>
                                                    </div>)}
                                        </ReactSortable>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <div
                            className={"bg-purple-500 w-40 rounded mx-auto py-2 text-2xl select-none mt-3 font-bold hover:bg-purple-400 cursor-pointer"}
                            onClick={handleSaveWeek}>Save
                        </div>
                    </div>
                    <p className={"my-4 mx-4 text-3xl font-bold text-gray-200"}>Enrollments:</p>
                    <div className={'grid grid-cols-4'}>
                        {(items.enrollments && selectedPrep) && items.enrollments.filter(item => item.standardSet === parseInt(selectedPrep)).map(item => (
                            <Link to={`/enrollmentdash/${item.id}`} key={`${item.id}`}>
                                <div className={"col-span-1 bg-blue-300 hover:bg-blue-500 rounded-2xl py-5 mt-4 mx-4"}
                                     id={"anim-div"}>
                                    {(item.title) &&
                                        <p className={"my-4 mx-4 text-3xl font-bold text-gray-700"}>{item.title}</p>}
                                </div>
                            </Link>
                            // <li key={item.id}>
                            //     {item.title}: {item.subject}
                            // </li>
                        ))}
                        <Link to={`/create/enrollment/`}>
                            <div className={"col-span-1 bg-green-400 hover:bg-green-500 rounded-2xl py-5 mt-4 mx-12"}
                                 id={"anim-div"}>
                                <p className={"my-4 mx-4 text-3xl font-bold tcdext-gray-700"}>+</p>
                            </div>
                        </Link>
                    </div>
                </>}
            </div>
        );
    }
}
export default TeacherHome;