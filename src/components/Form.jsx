import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Autocomplete from './Autocomplete';

function Form({ setSearch, getResults, search }) {
    
    const changeHandler = (e) => { setSearch(e.target.value)}
    
    return (
        <div className="block search__wrapper">
            <form onSubmit={getResults}>
                <div className="input__container">
                    <input type="text" placeholder="Search.." onChange={changeHandler} value={search}/>
                    <FontAwesomeIcon onClick={getResults} className="search__icon" icon={faSearch} />
                </div>
            </form>
            <div className="autocomplete-results__wrapper">
                {/* REPLACE W SEARCH RESULTS */}
                { search === '' ? 
                    ''
                    :
                    <Autocomplete />
                 }
            </div>
        </div>
    )
}

export default Form
