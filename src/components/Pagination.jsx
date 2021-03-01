import React, { useState, useEffect } from 'react'
import SearchService from '../services/SearchService'

function Pagination({ curPage, setCurPage, results, curCategory, setResults, curSearch, totalPages, setTotalPages }) {

    // const [totalPages, setTotalPages] = useState(1);
    const [categoryItemCount, setCategoryItemCount] = useState({});
    const [pageNos, setPageNos] = useState([]);

    const getNoPages = () => {
        if (categoryItemCount >= 1000) {
            setTotalPages(50);
        } else if (categoryItemCount <= 20) {
            setTotalPages(1)
        } else if (categoryItemCount < 1000 && categoryItemCount > 20){
            setTotalPages(Math.ceil(parseInt(categoryItemCount)/10))
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
            case 'Issues':
                setCategoryItemCount(results.issues.data.total_count);
                break;
            default: 
                break;
        }
    }

    const mapPagenos = () => {
        let pageNos = [];
        if (totalPages < 4) {
            for (let x = 1; x < totalPages + 1; x++) {
                pageNos.push(x)
            }
        } else if (curPage === 1) {
            for (let x = 1; x < 4; x++) {
                pageNos.push(x)
            }
        } else if (curPage === totalPages) {
            for (let x = totalPages - 2; x < totalPages + 1; x++) {
                pageNos.push(x)
            }
        } else {
            for (let x = curPage - 1; x < curPage + 2; x++) {
                pageNos.push(x)
            }
        }
        setPageNos(pageNos);
    }

    const handleClick = async (e) => {
        let category = curCategory.toLowerCase()
        switch (e.target.id) {
            case 'first':
                    setCurPage(1);
                break;
                case 'last':
                    setCurPage(totalPages);
                break;
            case 'next':
                if (curPage < totalPages) {
                    setCurPage(curPage + 1)
                }
                break;
            case 'prev':
                if (curPage > 1) {
                    setCurPage(curPage - 1)
                }
                break;
        
            default:
                break;
        }
        await SearchService.getSearch(curSearch, category, totalPages).then(res => {
            console.log(res, results)
            setResults({...results, [category]: {...results[category], data: res}})
            console.log(res, results)
        }).then(() => window.scrollTo(0,0))
        .catch(e => console.log(e))
    }

    
    useEffect(() => {
        getItemCount();
        getNoPages();
    }, [curCategory])
    
    useEffect(() => {
        mapPagenos();
    }, [curPage])

    return (
        <div className="row flex">
            <div className="page-number" onClick={handleClick} id="first">&lt;&lt;</div>
            <div className="page-number" onClick={handleClick} id="prev">&lt;</div>
            {pageNos.map(el => {
                return curPage === el ? 
                <div id={el} key={el} className="page-number active">{el}</div> 
                : 
                <div id={el} key={el} className="page-number">{el}</div>;
            })}

            <div className="page-number" onClick={handleClick} id="next">&gt;</div>
            <div className="page-number" onClick={handleClick} id="last">&gt;&gt;</div>
        </div>
    )
}

export default Pagination
