import React from 'react'

function ResultItem({ result }) {
    return (
        <div className="result-item__container" key={result.id}>
            <h4><a href={result.html_url}>{result.full_name}</a></h4>
            <p>{result.description}</p>
            <p>{result.desc}</p>
            <p>{result.stargazers_count} {result.language} come here updated when</p>
        </div>
    )
}

export default ResultItem
