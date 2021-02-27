import React from 'react'

function Autocomplete({ autoResults, setSearch, getResults }) {

  
    const handleClick = (e) => {
        console.log('clicked')
        setSearch(e.target.id);
        getResults(e);
    }

    return (
        <div className="autocomplete-results__container">
            <ul>
                { autoResults !== undefined ? 
                    autoResults.map((el,i) => {
                        return <li id={el} key={i} onClick={handleClick}>{el}</li>
                    })
                : '' }
            </ul>
        </div>
    )
}

export default Autocomplete
