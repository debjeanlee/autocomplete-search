import React, { useState, useEffect } from 'react'
import CategoryButton from './CategoryButton';
import ResultItem from './ResultItem';

function Results({ results }) {

    const [curCategory, setCurCategory] = useState('Repositories')

    const [categoryArr, setCats] = useState([])

    
    useEffect(() => {
        const getCategories = () => {
            let arr = [];
            for (const el in results) {
                arr.push(results[el])
            }
            setCats(arr)
        }
        getCategories();
    }, [results])
    console.log(curCategory, results.repositories.data)
   
    return (
        <div className="results__container">
            <h2>Results</h2>
            <div className="row flex categories__container">
              { categoryArr.length !== 0 ?
              categoryArr.map((el, i) => {
                  return <CategoryButton category={el.name} setCurCategory={setCurCategory} key={i}/> 
              })
              : '' }
            </div>
            {curCategory === 'Repositories' && results.repositories.data.items !== undefined ? 
            results.repositories.data.items.map(el => {
                return <ResultItem result={el} />
            })
        :
        ''}
        </div>
    )
}

export default Results
