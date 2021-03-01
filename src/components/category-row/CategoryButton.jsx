import React from 'react'

function CategoryButton({ category, setItemCount, 
    setCurCategory, setCurPage, setDisplayedResults, 
    totalCount, pageOneResults }) {

    const changeCat = (e) => {
        setCurCategory(e.target.id)
        setDisplayedResults(pageOneResults);
        setCurPage(1)
        setItemCount(totalCount)
    }

    return (
        <button onClick={changeCat} className="category__button" id={category}>
            {category}
            <span className="category__pill" id={category}>
                {totalCount}
            </span>
        </button>
    )
}

export default CategoryButton
