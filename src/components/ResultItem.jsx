import React from 'react'

function ResultItem({ result }) {

    let date = `Last Updated: ${result.updated_at}`;
    
    return (
        <div className="result-item__container" key={result.id}>
            <h4>
                <a href={result.html_url}>
                    { result.full_name !== undefined ? result.full_name : result.name }
                    { result.login === undefined ? '' : result.login }
                    { result.path === undefined ? '' : ` - ${result.path}` }
                </a>
            </h4>
            <p>{ result.description !== undefined ? result.description : '' }</p>
            <p>{result.desc}</p>
            {result.text_matches.map(el => {
                return <blockquote><code>"..{el.fragment}"</code></blockquote>
            })}
            <p>{result.stargazers_count === 0 
            || result.stargazers_count === undefined 
            ? '' : `Stars: ${result.stargazers_count}`} 
            
            {result.language && `Language: ${result.language}`} 
            
            {result.updated_at && date}</p>
        </div>
    )
}

export default ResultItem
