import React, { useState, useEffect } from 'react'
import CategoryButton from '../category-row/CategoryButton';
import ResultItem from './ResultItem';

function Results({ results, categoryArr, setCurCategory, curCategory, curSearch, setCurPage, displayedResults, setDisplayedResults }) {

    return (
        <div className="results__container">
            <h2 className="result-title">Results for "{curSearch}" in {curCategory}..</h2>

            {/* ---- Category Buttons ---- */}
            <div className="row flex categories__container">
              { categoryArr.length !== 0 ?
              categoryArr.map((el, i) => {
                  return <CategoryButton 
                            setDisplayedResults={setDisplayedResults} 
                            category={el.name} 
                            setCurCategory={setCurCategory} 
                            setCurPage={setCurPage} 
                            results={results} 
                            key={i}
                            /> 
              })
              : '' }
            </div>

            {/* ---- Repositories ---- */}
            {curCategory === 'Repositories' && displayedResults !== undefined ? 
            displayedResults.map((el, i) => {
                return <ResultItem curCategory={curCategory} result={el} key={`${i}_${el.id}_${el.name}`} />
            }) : ''}
            
            {curCategory === 'Repositories' && displayedResults.length === 0 ? 
            <h3>No matches for "{curSearch}" in Repositories..</h3> : ''}


            {/* ---- Code ---- */}
            {curCategory === 'Code' && displayedResults.length === 0 ? 
            <h3>No matches for "{curSearch}" in Code..</h3> : ''}

            {curCategory === 'Code' && displayedResults !== undefined ? 
            displayedResults.map((el, i) => {
                return <ResultItem curCategory={curCategory} result={el} key={`${i}_${el.id}_${el.name}`} code={true} />
            }) : ''}
            
            {/* ---- Issues ---- */}
            {curCategory === 'Issues' && displayedResults.length === 0 ? 
            <h3>No Issues named "{curSearch}" found..</h3> : ''}

            {curCategory === 'Issues' && displayedResults !== undefined ? 
            displayedResults.map((el, i) => {
                return <ResultItem curCategory={curCategory} result={el} key={`${i}_${el.id}_${el.name}`} code={true} />
            }) : ''}
        
            {/* ---- Users ---- */}
            {curCategory === 'Users' && displayedResults.length === 0 ? 
            <h3>User "{curSearch}" not found..</h3> : ''}
            
            {curCategory === 'Users' && displayedResults.items !== undefined ? 
            displayedResults.map((el,i) => {
                return <ResultItem curCategory={curCategory} result={el} key={`${i}_${el.id}_${el.name}`} />
            }) : ''}
        
        </div>
    )
}

export default Results
