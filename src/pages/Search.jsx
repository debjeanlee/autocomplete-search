import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Form from '../components/Form'
import Results from '../components/Results'

function Search() {

    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    const getResults = async () => {
        await Axios.get(`${process.env.REACT_APP_API}/code?q=${search}&page=1`, {
            headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`,
                "Accept": "application/vnd.github.v3.text-match+json"
            }
        }).then(res => console.log(res.data))
        .catch(e => console.error(e))
    }
    useEffect(() => {
        getResults();
    }, [search])

    return (
        <div className="content-container">
            <Form setSearch={setSearch} />
            <Results data={results} />
        </div>
    )
}

export default Search
