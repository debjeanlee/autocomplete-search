import React from 'react'

function Autocomplete({ autoResults, setSearch }) {

    // const data = autoResults.map(el => {
    //     return <li>{el.name} - {el.url}</li>
    // })
    const handleClick = (e) => {
        setSearch(e.target.id);
    }

    console.log(autoResults);
    return (
        <div className="autocomplete-results__container">
            <ul>
                {/* autocomplete list */}
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
