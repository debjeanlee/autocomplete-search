import React, { useState, useEffect } from 'react'
import CategoryButton from './CategoryButton';
import ResultItem from './ResultItem';

function Results({ results, categoryArr, setCurCategory, curCategory, curSearch }) {

    return (
        <div className="results__container">
            <h2>Results for {curSearch} in {curCategory}</h2>

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
            results.repositories.data.items.map(el => {
                return <ResultItem result={el} key={el.id} />
            }) : ''}

            {curCategory === 'Repositories' && results.repositories.data.items.length === 0 ? 
            <h3>No matches for this search..</h3> : ''}


            {/* ---- Code ---- */}
            {curCategory === 'Code' && results.code.data.items.length === 0 ? 
            <h3>No matches for this search..</h3> : ''}

            {curCategory === 'Code' && results.code.data.items !== undefined ? 
            results.code.data.items.map(el => {
                return <ResultItem result={el} key={el.id} />
            }) : ''}
            
            {/* ---- Users ---- */}
            {curCategory === 'Users' && results.users.data.items.length === 0 ? 
            <h3>No matches for this search..</h3> : ''}
            
            {curCategory === 'Users' && results.users.data.items !== undefined ? 
            results.users.data.items.map(el => {
                return <ResultItem result={el} key={el.id} />
            }) : ''}
        </div>
    )
}

export default Results
