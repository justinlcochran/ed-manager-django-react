import React from 'react';

function KnowShowButton({chart, handleClick}) {
    return (
        <button className={"rounded bg-gray-300 hover:bg-gray-400 max-w-max p-4 m-4"} onClick={handleClick}>
            <p className={"text-gray-700 text-2xl"}>{chart.author}: {chart.created}</p>
            <span className="grid grid-cols-2 gap-3">
                <div>
                    <p className={"text-gray-700 text-lg"}>Know</p>
                {chart.content.know.map(item => (<div className={"shadow bg-amber-200 my-2 text-gray-700 rounded w-36 p-3 text-sm"}>{item}</div>))}
                </div>
                <div>
                    <p className={"text-gray-700 text-lg"}>Show</p>
                {chart.content.show.map(item => (<div className={"shadow bg-amber-200 my-2 text-gray-700 rounded w-36 p-3 text-sm"}>{item}</div>))}
                </div>
            </span>
        </button>
    );
}

export default KnowShowButton;
