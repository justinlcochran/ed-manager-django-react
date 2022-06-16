import React, {useContext, useEffect, useState} from 'react';
import StandardContext from "../context/StandardContext";

function StandardSelector({standardSet}) {
    let {allStandards, selectedStandard, setSelectedStandard, error, isLoaded} = useContext(StandardContext)
    let filteredStandards = allStandards.filter(item => item.standardSet == standardSet)
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
                <select className={"text-gray-600 mt-4 text-2xl"} defaultValue={'1'} onChange={e => handleChange(e)} id="standardsDropDown"
                        name="standardsDropDown">
                    <option disabled value="1">Select a Standard</option>
                    {filteredStandards.map(item => <option key={item.code} value={item.id}>{item.code}</option>)}
                </select>
                <p className={"my-4 text-lg"}>{selectedStandard.text}</p>
            </>
    )
    }
}

export default StandardSelector;
