import React from 'react'

const Pagination = ({handleFilter, pagination}) => {
    let pages = []

    for(let i = 1; i<=pagination.totalPage; i++) {
        let disabled = (i === pagination.currentPage) ? ' disabled' : ''
        let value = { value: i }
        
        pages.push({
            disabled: disabled,
            value: value
        })
    }

    pagination.nextPage = { value:pagination.nextPage }
    pagination.previousPage = { value:pagination.previousPage }

    return (
        <nav className="d-flex justify-content-between">
            <form className="form-inline form-sm">
                <label className="mr-2 mb-1">Rows per page</label>
                <select className="form-control form-control-sm p-0" onChange={e => handleFilter(e.target, 'limit')}>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                </select>
            </form>
            <ul class="pagination my-2">
                <li class={(pagination.previousPage.value) ? "page-item" : "page-item disabled"}>
                    <a class="page-link" href="#"  onClick={()=>handleFilter(pagination.previousPage, 'page')} tabindex="-1">Previous</a>
                </li>
                    {pages.map(page=>
                        (<li class={'page-item'+page.disabled}>
                            <a class="page-link" href="#" onClick={()=>handleFilter(page.value, 'page')}>{page.value.value}</a>
                        </li>)
                    )} 
                
                <li class={(pagination.nextPage.value) ? "page-item" : "page-item disabled"}>
                    <a class="page-link" href="#" onClick={()=>handleFilter(pagination.nextPage, 'page')}>Next</a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
