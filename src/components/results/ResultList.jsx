import React from 'react'
import CategoryList from '../category-row/CategoryList'
import ResultItem from './ResultItem'

function ResultList({ curSearch, curCategory, categoryArr, setDisplayedResults, setCurCategory, setCurPage, displayedResults }) {
    
    console.log(curCategory, 'displayed', displayedResults)

    return (
        <div className="results__container">
            <h2 className="result-title">Results for "{curSearch}" in {curCategory}..</h2>
            <CategoryList 
                categoryArr={categoryArr}
                setDisplayedResults={setDisplayedResults}
                setCurCategory={setCurCategory}
                setCurPage={setCurPage}
            />
        {displayedResults !== undefined &&
            displayedResults.map((el, i) => {
                return <ResultItem curCategory={curCategory} result={el} key={`${i}_${el.id}_${el.name}`} />
            })
        }
        
        </div>
    )
}

export default ResultList
