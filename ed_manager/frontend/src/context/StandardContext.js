import React, { createContext, useState, useEffect } from "react";

const StandardContext = createContext()

export default StandardContext

export const StandardContextProvider = ({children}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [allStandards, setAllStandards] = useState([]);
    let [selectedStandard, setSelectedStandard] = useState({id: null, code: null, text: '^ Choose a Standard ^'});

    useEffect(() => {
        fetch("/standard/")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAllStandards(result);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    let contextData = {
        allStandards: allStandards,
        selectedStandard: selectedStandard,
        error: error,
        isLoaded: isLoaded,
        setAllStandards: setAllStandards,
        setSelectedStandard: setSelectedStandard,
    }

    return (
        <StandardContext.Provider value={contextData}>
            {children}
        </StandardContext.Provider>
    );
}
