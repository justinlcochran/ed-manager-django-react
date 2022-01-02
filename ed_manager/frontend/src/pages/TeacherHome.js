import React, {useEffect, useState} from 'react';

function TeacherHome(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

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
        console.log(items)
        return (
            <ul className={'standard-list'}>
                {items.map(item => (
                    <li key={item.id}>
                        {item.code}: {item.text} ({item.subject})
                    </li>
                ))}
            </ul>
        );
    }
}

export default TeacherHome;