import React from 'react'
import CategoryButton from './CategoryButton'


function CategoryList({ categoryArr, setDisplayedResults, setCurCategory, setCurPage }) {
    
    console.log(categoryArr)
    return (
        <div className="row flex categories__container">
              { categoryArr.length !== 0 ?
              categoryArr.map((el, i) => {
                  return <CategoryButton 
                            setDisplayedResults={setDisplayedResults} 
                            category={el.name} 
                            totalCount={el.data.total_count}
                            setCurCategory={setCurCategory} 
                            setCurPage={setCurPage} 
                            pageOneResults={el.data.items}
                            key={i}
                            /> 
              })
              : '' }
            </div>
    )
}

export default CategoryList
