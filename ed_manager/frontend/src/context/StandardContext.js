import React, { createContext, useState, useEffect } from "react";

const StandardContext = createContext()

export default StandardContext

export const StandardSelector = ({children}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    let [standardText, setStandardText] = useState('');

    const handleChange = (e) => {
        const data = items.find((d) => d.id == e.target.value);
        setStandardText(data.text)
    }

    let contextData = {
        standardText:standardText,
        handleChange:handleChange,
    }


    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/standard")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

        return (
            <StandardContext.Provider value={contextData}>
                {/*<div>*/}
                {/*    <select defaultValue={'1'} onChange={e =>handleChange({e: e})} id="standardsDropDown" name="standardsDropDown" form="chartBuilder">*/}
                {/*        <option disabled value="1">Select a Standard</option>*/}
                {/*        {items.map(item => (*/}
                {/*            <option key={item.code} value={item.id}>{item.code}</option>*/}
                {/*        ))}*/}
                {/*    </select>*/}
                {/*    <p>{standardText}</p>*/}
                {/*</div>*/}
                {children}
            </StandardContext.Provider>
        );
    }
