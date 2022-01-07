import React, {useContext, useEffect, useState} from 'react';
import StandardContext from "../context/StandardContext";

function StandardSelector(props) {
    let {allStandards, selectedStandard, setSelectedStandard, error, isLoaded} = useContext(StandardContext)

    const handleChange = (e) => {
        setSelectedStandard(allStandards.find(item => (item.id === parseInt(e.target.value))))
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <select className={"text-gray-600"} defaultValue={'1'} onChange={e => handleChange(e)} id="standardsDropDown"
                        name="standardsDropDown">
                    <option disabled value="1">Select a Standard</option>
                    {allStandards.map(item => <option key={item.code} value={item.id}>{item.code}</option>)}
                </select>
                <p>{selectedStandard.text}</p>
            </>
    )
    }
}

export default StandardSelector;
