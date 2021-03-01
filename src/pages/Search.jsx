import React, { useState, useEffect } from 'react'
import Form from '../components/form/Form'
import Results from '../components/results/Results'
import SearchService from '../services/SearchService'
import useDebounce from '../functions/useDebounce'
import ResultList from '../components/results/ResultList'

function Search({search, setSearch, curSearch, setCurSearch}) {

    const [loading, setLoading] = useState(false)
    const [curCategory, setCurCategory] = useState('Repositories')
    const [categoryArr, setCats] = useState([])
    const [curPage, setCurPage] = useState(1);
    const [displayedResults, setDisplayedResults] = useState([])
    const [autoResults, setAutoResults] = useState([])
    const [pageOneResults, setPageOneResults] = useState({
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
    });

    const debouncedSearchTerm = useDebounce(search, 250);

    const getResults = (search, e) => {
        e.preventDefault()
        setLoading(true);
        let categories = []
        for (const cat in pageOneResults) {
            categories.push(SearchService.getSearch(search, cat, 1))
        }
        Promise.allSettled(categories)
        .then(res => {
            setDisplayedResults(res[0].value.items)
            setPageOneResults({...pageOneResults, 
                repositories: {...pageOneResults.repositories, data: res[0].value},
                code: {...pageOneResults.code, data: res[1].value},
                issues: {...pageOneResults.issues, data: res[2].value},
                users: {...pageOneResults.users, data: res[3].value},
            })
            setDisplayedResults(res[0].value.items)
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
            for (const el in pageOneResults) {
                arr.push(pageOneResults[el])
            }
            setCats(arr)
        }
        getCategories();
    }, [pageOneResults])

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
            {/* { curSearch !== '' && loading === false ?
            <Results 
                curSearch={curSearch}
                results={pageOneResults} 
                categoryArr={categoryArr} 
                setCurCategory={setCurCategory} 
                curCategory={curCategory} 
                setResults={setPageOneResults}
                setCurPage={setCurPage}
                displayedResults={displayedResults}
                setDisplayedResults={setDisplayedResults}
            />
            : '' } */}
            { curSearch !== '' && loading === false ?
            <ResultList 
                curSearch={curSearch}
                curCategory={curCategory}
                categoryArr={categoryArr}
                setDisplayedResults={setDisplayedResults}
                setCurCategory={setCurCategory}
                setCurPage={setCurPage}
                displayedResults={displayedResults}
            />
            : '' }
        </div>
    )
}

export default Search
