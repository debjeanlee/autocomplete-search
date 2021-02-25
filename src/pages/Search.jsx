import React, { useState } from 'react'
import Form from '../components/Form'
import Results from '../components/Results'
import SearchService from '../services/SearchService'

function Search() {

    const [search, setSearch] = useState('');
    const [results, setResults] = useState({
        repositories: {
            name: 'Repositories',
            data: [],
        },
        code: {
            name: 'Code',
            data: [],
        },
        commits: {
            name: 'Commits',
            data: [],
        },
        issues: {
            name: 'Issues',
            data: [],
        },
        packages: {
            name: 'Packages',
            issues: []
        },
        marketplace: {
            name: 'Marketplace',
            data: [],
        },
        topics: {
            name: 'Topics',
            data: [],
        },
        wikis: {
            name: 'Wikis',
            data: [],
        },
        users: {
            name: 'Users',
            data: [],
        },
    });

    const getResults = (e) => {
        e.preventDefault();
        SearchService.getRepositories(search)
        .then(res => setResults({...results, repositories: {...results.repositories, data: res}}))
        .catch(err => console.log(err))
        setSearch('');
    }
// useEffect(() => {
//         SearchService.getRepositories(search).then(res => console.log(res)).catch(e => console.log(e))
// }, [])

    return (
        <div className="content-container">
            <Form search={search} setSearch={setSearch} getResults={getResults} />
            <Results results={results} />
        </div>
    )
}

export default Search
