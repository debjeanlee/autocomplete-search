import React from 'react'

function Autocomplete({ autoResults, setSearch, getResults }) {

  
    const handleClick = (e) => {
        setSearch(e.target.id);
        getResults(e.target.id);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClick(e);
        }
    }
    return (
        <div className="autocomplete-results__container">
            <ul>
                { autoResults !== undefined ? 
                    autoResults.map((el,i) => {
                        return <li id={el} key={i} onClick={handleClick} tabIndex="0" onKeyDown={handleKeyDown}>{el}</li>
                    })
                : '' }
            </ul>
        </div>
    )
}

export default Autocomplete
