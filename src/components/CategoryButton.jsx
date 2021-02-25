import React from 'react'

function CategoryButton({ category, setCurCategory }) {

    const changeCat = (e) => {
        setCurCategory(e.target.id)
    }

    return (
        <button onClick={changeCat} className="category__button" id={category}>
            {category}
            <span className="stars__pill" id={category}>100k</span>
        </button>
    )
}

export default CategoryButton
