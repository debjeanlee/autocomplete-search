import React, { useState, useEffect } from 'react'
import Form from '../components/Form'
import Results from '../components/Results'
import SearchService from '../services/SearchService'

function Search() {

    const [loading, setLoading] = useState(false)
    const [curCategory, setCurCategory] = useState('Repositories')
    const [categoryArr, setCats] = useState([])
    const [curSearch, setCurSearch] = useState('')
    const [search, setSearch] = useState('');
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
        users: {
            name: 'Users',
            data: [],
        },
    });

    const getResults = (e) => {
        setLoading(true);
        e.preventDefault();
        Promise.allSettled([
            SearchService.getRepositories(search), 
            SearchService.getCode(search),
            SearchService.getUsers(search),
        ])
        .then(res => {
            console.log("res[2]", res[2])
            setResults({...results, 
                repositories: {...results.repositories, data: res[0].value},
                code: {...results.code, data: res[1].value},
                users: {...results.users, data: res[2].value},
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
        setTimeout(() => {
            SearchService.getAutoComplete(search)
            .then(res => setAutoResults(res))
            .catch(e => console.log(e))
        }, 500);
    }, [search])

    console.log(autoResults)

    return (
        <div className="content-container">
            <Form 
                search={search} 
                setSearch={setSearch} 
                getResults={getResults} 
                autoResults={autoResults}
            />
            { loading && <h1>Loading..</h1> }
            { curSearch !== '' && loading === false ?
            <Results 
                curSearch={curSearch}
                results={results} 
                categoryArr={categoryArr} 
                setCurCategory={setCurCategory} 
                curCategory={curCategory} 
            />
            : '' }
        </div>
    )
}

export default Search
