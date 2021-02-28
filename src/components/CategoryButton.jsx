import React from 'react'

function CategoryButton({ category, setCurCategory, results }) {

    const changeCat = (e) => {
        setCurCategory(e.target.id)
    }

    return (
        <button onClick={changeCat} className="category__button" id={category}>
            {category}
            <span className="category__pill" id={category}>
                {category === 'Repositories' && results.repositories.data.total_count}
                {category === 'Code' && results.code.data.total_count}
                {category === 'Users' && results.users.data.total_count}
            </span>
        </button>
    )
}

export default CategoryButton
