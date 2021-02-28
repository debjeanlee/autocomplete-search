import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function ResultItem({ result, code, curCategory }) {

    let newDate = new Date(result.updated_at);
    let date = `Last Updated: ${newDate.getUTCDate()}/${newDate.getUTCMonth()+1}/${newDate.getUTCFullYear()}`;

    switch (curCategory) {
        case 'Code':
            return (
            <div className="result-item__container">
                    <a href={result.repository.html_url} className="code-repo-fullname">{result.repository.full_name}</a>
                <h4 className="code-main-link">
                    <a href={result.url}>{result.name}</a>
                </h4>
                <p>{result.repository.description}</p>
                <blockquote className="fs-12">Text matches:</blockquote>
                { result.text_matches.map((el, i) => {
                    return <blockquote key={i}><code>{el.fragment}</code></blockquote>
                })}
            </div>
            );
        
        case 'Issues':
            const repoName = result.repository_url.slice(29)
            return (
                <div className="result-item__container">
                        <a href={result.html_url} className="code-repo-fullname">{repoName}</a>
                    <h4 className="issues-repo-h4">
                        <a href={result.repository_url}>{result.title}</a>
                    </h4>
                    <p>{result.body}</p>
                    <p className="bottom-row fs-12"><span>{date}</span></p>
                </div>
            );

        case 'Repositories':
            return (
                <div className="result-item__container">
                    <h4>
                        <a href={result.html_url}>{result.full_name}</a>
                    </h4>
                    <p className="fs-12">{result.description}</p>
                    <p className="bottom-row fs-14">{result.stargazers_count && result.stargazers_count !== 0 ?
                    <span className="star-results__container"><FontAwesomeIcon icon={faStar} className="star__icon" />{result.stargazers_count}</span>
                : ''} 
                    <span className="star-results__container">{result.language}</span>
                    <span>{date}</span></p>
                </div>
            );

        case 'Users':
            return (
                <div className="result-item__container">
                    { result.avatar_url && <img className="avatar" src={result.avatar_url} alt={`${result.login}`} /> }
                    <h4>
                        <a href={result.html_url}>
                            {result.login}
                        </a>
                    </h4>
                </div>
            )
        

        default:
            break;
    }
}

export default ResultItem
