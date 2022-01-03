import React, {useEffect, useState} from 'react';

function StandardSelector({ standard, setStandard }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const handleChange = (e) => {
        let obj = items.find(item => item.id == e.target.value)
        setStandard(obj)
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

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return <div>
                <select defaultValue={'1'} onChange={e => handleChange(e)} id="standardsDropDown"
                        name="standardsDropDown">
                    <option disabled value="1">Select a Standard</option>
                    {items.map(item => <option key={item.code} value={item.id}>{item.code}</option>)}
                </select>
                <p>{standard.text}</p>
            </div>;
        }
    }

    export default StandardSelector;
