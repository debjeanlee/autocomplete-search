import React, { useState, useEffect } from 'react'
import Form from '../form/Form'
import SearchService from '../../services/SearchService'
import useDebounce from '../../functions/useDebounce'
import ResultList from '../results/ResultList'
import Pagination from '../utility/Pagination'

function Search({search, setSearch, curSearch, setCurSearch}) {

    const [loading, setLoading] = useState(false)
    const [curCategory, setCurCategory] = useState('Repositories')
    const [curCatItemCount, setItemCount] = useState(null)
    const [categoryArr, setCats] = useState([])
    const [curPage, setCurPage] = useState(1);
    const [displayedResults, setDisplayedResults] = useState([])
    const [autoResults, setAutoResults] = useState([])
    const [totalPages, setTotalPages] = useState(1)
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
            setItemCount(res[0].value.total_count);
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

    useEffect(() => {

    const getNoPages = (count) => {
        if (count <= 20) {
            return setTotalPages(1);
        } else if (count > 1000) {
           return setTotalPages(50);
        } else {
            const noPages = Math.ceil((parseInt(curCatItemCount)/20));
            return setTotalPages(noPages);
        }
    }

        getNoPages(curCatItemCount);
    }, [curCatItemCount, curPage, totalPages])
  

    return (
        <div className="content-container">
            <Form 
                search={search} 
                setSearch={setSearch} 
                getResults={getResults} 
                autoResults={autoResults}
                setCurSearch={setCurSearch}
            />
            { loading && <h2 className="loading">Loading..</h2> }
            { curSearch !== '' && loading === false ?
            <ResultList 
                curSearch={curSearch}
                curCategory={curCategory}
                categoryArr={categoryArr}
                setDisplayedResults={setDisplayedResults}
                setCurCategory={setCurCategory}
                setCurPage={setCurPage}
                displayedResults={displayedResults}
                setItemCount={setItemCount}
            />
            : '' }
            { !loading && curSearch !== '' &&
                <Pagination 
                    curPage={curPage}
                    categoryArr={categoryArr}
                    setCurPage={setCurPage}
                    setDisplayedResults={setDisplayedResults}
                    curSearch={curSearch}
                    category={curCategory}
                    setLoading={setLoading}
                    totalPages={totalPages}
                />
            }
        </div>
    )
}

export default Search
