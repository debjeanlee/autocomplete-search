import React from 'react'
import categoryNames from '../info/categoryNames';
import tempResults from '../tempResults';
import CategoryButton from './CategoryButton';
import ResultItem from './ResultItem';

function Results({ data }) {

    const categories = categoryNames.map(category => {
        return <CategoryButton category={category} />
    })

    const resultList = tempResults.map(el => {
        return <ResultItem result={el} />
    })
    
    return (
        <div className="results__container">
            <h2>Results</h2>
            <div className="row flex categories__container">
              {categories}  
            </div>
            {resultList}
        </div>
    )
}

export default Results
