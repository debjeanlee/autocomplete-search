import React, { useState, useEffect } from 'react'
import SearchService from '../../services/SearchService';

function Pagination({ curPage, totalPages, setCurPage, setDisplayedResults, curSearch, category, setLoading }) {

    const [pages, setPages] = useState([])

    const handleClick = async (e) => {
        async function getPage(no){
            setLoading(true);
            await SearchService.getSearch(curSearch, category.toLowerCase(), curPage).then(res => {
                setDisplayedResults(res.items)
            }).then(() => {
                setLoading(false)
            })
            .catch(e => console.log(e))
        }
        switch (e.target.id) {
            case 'first':
                    setCurPage(1);
                    getPage(1);
                    break;
                case 'last':
                    setCurPage(totalPages);
                    getPage(totalPages);
                    break;
            case 'next':
                if (curPage < totalPages) {
                    setCurPage(curPage + 1)
                    getPage(curPage + 1)
                }
                break;
            case 'prev':
                if (curPage > 1) { 
                    setCurPage(curPage - 1) 
                    getPage(curPage - 1)
                }
                break;
            default:
                let page = parseInt(e.target.id)
                setCurPage(page);
                getPage(page)
                break;
        }
        
    }


    useEffect(() => {
    const showPages = () => {
        switch (curPage) {
            case 1:
                if (totalPages === 1) {
                    return setPages([])
                } else if (totalPages === 2) {
                    return setPages([1, 2])
                } else {
                    return setPages([1,2,3])
                }
            case totalPages:
                if (totalPages > 3) {
                    return setPages([totalPages - 2, totalPages - 1, totalPages])
                } else {
                    return setPages([1, 2])
                }
            default:
                return setPages([curPage - 1, curPage, curPage + 1]);
        }
    }
    showPages()
    }, [totalPages, curPage])

   return  pages.length !== 0 && (
    <div className="row flex page-number__container">
            <div className="page-number" onClick={handleClick} id="first">&lt;&lt;</div>
            <div className="page-number" onClick={handleClick} id="prev">&lt;</div>
            {pages.map(el => {
                return curPage === el ? 
                <div id={el} key={el} className="page-number active">{el}</div> 
                : 
                <div id={el} key={el} onClick={handleClick} className="page-number">{el}</div>;
            })}

            <div className="page-number" onClick={handleClick} id="next">&gt;</div>
            <div className="page-number" onClick={handleClick} id="last">&gt;&gt;</div>
    </div>
   )
}

export default Pagination
