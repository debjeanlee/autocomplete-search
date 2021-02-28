import React, { useState, useEffect } from 'react'
import CategoryButton from './CategoryButton';
import Pagination from './Pagination';
import ResultItem from './ResultItem';

function Results({ results, categoryArr, setCurCategory, curCategory, curSearch, setResults }) {

    const [curPage, setCurPage] = useState(1);

    return (
        <div className="results__container">
            <h2 className="result-title">Results for "{curSearch}" in {curCategory}..</h2>

            {/* ---- Categories ---- */}
            <div className="row flex categories__container">
              { categoryArr.length !== 0 ?
              categoryArr.map((el, i) => {
                  return <CategoryButton category={el.name} setCurCategory={setCurCategory} results={results} key={i}/> 
              })
              : '' }
            </div>

            {/* ---- Repositories ---- */}
            {curCategory === 'Repositories' && results.repositories.data.items !== undefined ? 
            results.repositories.data.items.map((el, i) => {
                return <ResultItem curCategory={curCategory} result={el} key={`${i}_${el.id}_${el.name}`} />
            }) : ''}

            {curCategory === 'Repositories' && results.repositories.data.items.length === 0 ? 
            <h3>No matches for "{curSearch}" in Repositories..</h3> : ''}


            {/* ---- Code ---- */}
            {curCategory === 'Code' && results.code.data.items.length === 0 ? 
            <h3>No matches for "{curSearch}" in Code..</h3> : ''}

            {curCategory === 'Code' && results.code.data.items !== undefined ? 
            results.code.data.items.map((el, i) => {
                return <ResultItem curCategory={curCategory} result={el} key={`${i}_${el.id}_${el.name}`} code={true} />
            }) : ''}
            
            {/* ---- Issues ---- */}
            {curCategory === 'Issues' && results.issues.data.items.length === 0 ? 
            <h3>No Issues named "{curSearch}" found..</h3> : ''}

            {curCategory === 'Issues' && results.issues.data.items !== undefined ? 
            results.issues.data.items.map((el, i) => {
                return <ResultItem curCategory={curCategory} result={el} key={`${i}_${el.id}_${el.name}`} code={true} />
            }) : ''}
            
            {/* ---- Users ---- */}
            {curCategory === 'Users' && results.users.data.items.length === 0 ? 
            <h3>User "{curSearch}" not found..</h3> : ''}
            
            {curCategory === 'Users' && results.users.data.items !== undefined ? 
            results.users.data.items.map((el,i) => {
                return <ResultItem curCategory={curCategory} result={el} key={`${i}_${el.id}_${el.name}`} />
            }) : ''}
            {/* <Pagination curPage={curPage} setCurPage={setCurPage} results={results} curCategory={curCategory} setResults={setResults} /> */}
        </div>
    )
}

export default Results
