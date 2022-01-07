import React, {useContext} from 'react';
import CreateAssessmentContext from "../context/CreateAssessmentContext";

function KnowShowButton({chart}) {
    let {setKnowShowRequired} = useContext(CreateAssessmentContext)
    const handleKSClick = () => {
        setKnowShowRequired(chart)
    }

    return (
        <button className={"rounded bg-gray-300 hover:bg-gray-400 max-w-max p-4 m-4"} value={chart.id} onClick={handleKSClick}>
            <p className={"text-gray-700 text-2xl"}>{chart.author}: {chart.created}</p>
            <span className="grid grid-cols-2 gap-3">
                <div>
                    <p className={"text-gray-700 text-lg"}>Know</p>
                {chart.content.know.map(item => (<div className={"shadow bg-amber-200 my-2 text-gray-700 rounded w-56 p-3 text-lg"} key={item}>{item}</div>))}
                </div>
                <div>
                    <p className={"text-gray-700 text-lg"}>Show</p>
                {chart.content.show.map(item => (<div className={"shadow bg-amber-200 my-2 text-gray-700 rounded w-56 p-3 text-lg"} key={item}>{item}</div>))}
                </div>
            </span>
        </button>
    );
}

export default KnowShowButton;
