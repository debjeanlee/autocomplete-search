import React, { useState, useEffect } from 'react'

function Pagination({ curPage, setCurPage, results, curCategory, setResults }) {

    const [totalPages, setTotalPages] = useState();
    const [categoryItemCount, setCategoryItemCount] = useState({});

    const getNoPages = () => {
        if (categoryItemCount >= 1000) {
            setTotalPages(100);
        } else if (categoryItemCount <= 10) {
            setTotalPages(null)
        } else {
            setTotalPages(Math.ceil(categoryItemCount/10))
        }
    }
    
    const getItemCount = () => {
        switch (curCategory) {
            case 'Repositories':
                setCategoryItemCount(results.repositories.data.total_count);
                break;
            case 'Code':
                setCategoryItemCount(results.code.data.total_count);
                break;
            case 'Users':
                setCategoryItemCount(results.users.data.total_count);
                break;
        
            default: 
                break;
        }
    }

    const handleClick = (e) => {
        
    }

    
    useEffect(() => {
        getItemCount()
        getNoPages()
    }, [curCategory])

    return (
        <div className="row flex">
            <div className="page-number">&lt;&lt;</div>
            <div className="page-number">&lt;</div>

                <div className="page-number active">{totalPages}</div>
                <div className="page-number">2</div>
                <div className="page-number">3</div>
             
            <div className="page-number">&gt;</div>
            <div className="page-number">&gt;&gt;</div>
        </div>
    )
}

export default Pagination
