import React from 'react'
import { 
    Pagination, PaginationItem, PaginationLink, 
    Form, FormGroup, Label, Input
} from 'reactstrap';

const PaginationNav = ({handleFilter, pagination}) => {
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
        <div className="PaginationNav d-flex justify-content-between">
            <Form className="form-sm" inline>
                <FormGroup>
                    <Label className="mr-2 mb-1" for="rows">Rows</Label>
                    <Input className="form-control-sm p-0" type="select" id="rows">
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                    </Input>
                </FormGroup>
            </Form>
            <Pagination>
                <PaginationItem className={(!pagination.previousPage.value) && 'disabled' }>
                    <PaginationLink href="#"  onClick={()=>handleFilter(pagination.previousPage, 'page')}>
                        previous
                    </PaginationLink>
                </PaginationItem>
                    {pages.map(page=>
                        (<PaginationItem className={page.disabled}>
                            <PaginationLink href="#" onClick={()=>handleFilter(page.value, 'page')}>
                                {page.value.value}
                            </PaginationLink>
                        </PaginationItem>)
                    )}
                <PaginationItem className={(!pagination.nextPage.value) && 'disabled' }>
                    <PaginationLink href="#"  onClick={()=>handleFilter(pagination.nextPage, 'page')}>
                        next
                    </PaginationLink>
                </PaginationItem>
            </Pagination>
        </div>
    )
}

export default PaginationNav
