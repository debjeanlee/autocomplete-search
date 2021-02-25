import React from 'react'
import tempResults from '../tempResults';

function Results({ data }) {

    const list = tempResults.map(el => {
        return (
            <div className="result-item__container">
                <h4>{el.name}</h4>
                <p>{el.url}</p>
                <p>{el.desc}</p>
            </div>
        )
    })
    
    return (
        <div className="results__container">
            <h2>Results</h2>
            {list}
        </div>
    )
}

export default Results
