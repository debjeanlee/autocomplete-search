import React, { useState, useEffect } from 'react'

function Pagination({ page, setPage, results, curCategory, setResults }) {

    const [totalPages, setTotalPages] = useState();
    const [pageNos, setPageNos] = useState('');

    const getPages = () => {
        switch (curCategory) {
            case 'Repositories':
                setTotalPages(Math.ceil(results.repositories.data.total_count/30))
                break;
            case 'Code':
                setTotalPages(Math.ceil(results.code.data.total_count/30))
                break;
            case 'Users':
                setTotalPages(Math.ceil(results.users.data.total_count/30))
                break;
            default:
                setTotalPages(1)
                break;
        }
    }

    useEffect(() => {
        getPages();
    }, [page])

    return (
        <div className="row flex">
            <div className="page-number">&lt;&lt;</div>
            <div className="page-number">&lt;</div>
           
                <div className="page-number active">1</div>
                <div className="page-number">2</div>
                <div className="page-number">3</div>
             
            <div className="page-number">&gt;</div>
            <div className="page-number">&gt;&gt;</div>
        </div>
    )
}

export default Pagination
