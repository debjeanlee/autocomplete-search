import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function ResultItem({ result, code }) {

    let newDate = new Date(result.updated_at);
    let date = `Last Updated: ${newDate.getUTCDate()}/${newDate.getUTCMonth()+1}/${newDate.getUTCFullYear()}`;
    
    return (
        <div className="result-item__container">
            { result.avatar_url && <img className="avatar" src={result.avatar_url} alt={`${result.login}`} /> }
            <h4>
                <a href={result.html_url}>
                    { result.full_name !== undefined ? result.full_name : result.name }
                    { result.login === undefined ? '' : result.login }
                    { result.path === undefined ? '' : ` - ${result.path}` }
                </a>
            </h4>
            <p>{ result.description !== undefined ? result.description : '' }</p>
            <p>{result.desc}</p>
            { code ?
            result.text_matches.map((el, i) => {
                return <blockquote key={i}><code>{el.fragment}</code></blockquote>
            }) : ''}
            <p className="bottom-row">{result.stargazers_count && result.stargazers_count !== 0 ?
            <span className="star-results__container"><FontAwesomeIcon icon={faStar} className="star__icon" />{result.stargazers_count}</span>
        : ''} 
            
            {result.language && <span className="star-results__container">{result.language}</span> } 
            
            {result.updated_at && date}</p>
        </div>
    )
}

export default ResultItem
