import React from 'react'

function CategoryButton({ category }) {
    return (
        <button className="category__button">
            {category}
            <label className="stars__pill">100k</label>
        </button>
    )
}

export default CategoryButton
