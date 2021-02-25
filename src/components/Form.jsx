import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Autocomplete from './Autocomplete';

function Form({ setSearch }) {
    
    const [input, setInput] = useState('');

    const changeHandler = (e) => { setInput(e.target.value)}
    
    function search(){
        // setSearch(input)
        alert('Clickedddddyyy')
    }
    
    return (
        <div className="block search__wrapper">
            <form onSubmit={search}>
                <div className="input__container">
                    <input type="text" placeholder="Search..." onChange={changeHandler} />
                    <FontAwesomeIcon onClick={search} className="search__icon" icon={faSearch} />
                </div>
            </form>
            <div className="autocomplete-results__wrapper">
                {/* REPLACE W SEARCH RESULTS */}
                { input === '' ? 
                    ''
                    :
                    <Autocomplete />
                 }
            </div>
        </div>
    )
}

export default Form
