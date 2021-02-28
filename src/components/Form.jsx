import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Autocomplete from './Autocomplete';

function Form({ setSearch, getResults, search, autoResults }) {
    
    const changeHandler = (e) => { setSearch(e.target.value)}
    
    return (
        <div className="block search__wrapper">
            <form onSubmit={(e) => getResults(search, e)}>
                <div className="input__container">
                    <input type="text" placeholder="Search.." onChange={changeHandler} value={search} />
                    <FontAwesomeIcon onClick={getResults} className="search__icon" icon={faSearch} />
                </div>
            </form>
            <div className="autocomplete-results__wrapper">
                {/* REPLACE W SEARCH RESULTS */}
                { search === '' ? 
                    ''
                    :
                    <Autocomplete autoResults={autoResults} setSearch={setSearch} getResults={getResults} />
                 }
            </div>
        </div>
    )
}

export default Form
