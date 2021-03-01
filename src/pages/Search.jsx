import React, { useState, useEffect } from 'react'
import Form from '../components/Form'
import Results from '../components/Results'
import SearchService from '../services/SearchService'
import useDebounce from '../functions/useDebounce'

function Search({search, setSearch, curSearch, setCurSearch}) {

    const [loading, setLoading] = useState(false)
    const [curCategory, setCurCategory] = useState('Repositories')
    const [categoryArr, setCats] = useState([])
    const [autoResults, setAutoResults] = useState([])
    const [results, setResults] = useState({
        repositories: {
            name: 'Repositories',
            data: [],
        },
        code: {
            name: 'Code',
            data: [],
        },
        issues: {
            name: 'Issues',
            data: []
        },
        users: {
            name: 'Users',
            data: [],
        },
        // before users
        // commits, issues, packages, marketplace, topics, wikis, users
    });

    const debouncedSearchTerm = useDebounce(search, 250);

    const getResults = (search, e) => {
        e.preventDefault()
        setLoading(true);
        let categories = []
        for (const cat in results) {
            categories.push(SearchService.getSearch(search, cat, 1))
        }
        // Promise.allSettled([
        //     SearchService.getSearch(search, 'repositories', 1), 
        //     // SearchService.getRepositories(search, 1), 
        //     SearchService.getCode(search, 1),
        //     SearchService.getUsers(search, 1),
        // ])
        Promise.allSettled(categories)
        .then(res => {
            setResults({...results, 
                repositories: {...results.repositories, data: res[0].value},
                code: {...results.code, data: res[1].value},
                issues: {...results.issues, data: res[2].value},
                users: {...results.users, data: res[3].value},
            })
        })
        .then(() => setLoading(false))
        .catch(e => console.log(e))
       
        setCurCategory('Repositories');
        setCurSearch(search);
        setSearch('');
    }
    
    useEffect(() => {
        const getCategories = () => {
            let arr = [];
            for (const el in results) {
                arr.push(results[el])
            }
            setCats(arr)
        }
        getCategories();
    }, [results])

    useEffect(() => {
        if (debouncedSearchTerm) {
            SearchService.getAutoComplete(debouncedSearchTerm)
            .then(res => setAutoResults(res))
            .catch(e => console.log(e))
        } else {
            setAutoResults([])
        }
    }, [debouncedSearchTerm])

    return (
        <div className="content-container">
            <Form 
                search={search} 
                setSearch={setSearch} 
                getResults={getResults} 
                autoResults={autoResults}
                setCurSearch={setCurSearch}
            />
            { loading && <h1>Loading..</h1> }
            { curSearch !== '' && loading === false ?
            <Results 
                curSearch={curSearch}
                results={results} 
                categoryArr={categoryArr} 
                setCurCategory={setCurCategory} 
                curCategory={curCategory} 
                setResults={setResults}
            />
            : '' }
        </div>
    )
}

export default Search
