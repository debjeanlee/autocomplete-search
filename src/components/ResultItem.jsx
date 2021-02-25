import React from 'react'

function ResultItem({ result }) {
    return (
        <div className="result-item__container">
            <h4>{result.name}</h4>
            <p>{result.url}</p>
            <p>{result.desc}</p>
            <p>language & stars come here updated when</p>
        </div>
    )
}

export default ResultItem
