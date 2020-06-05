import React from 'react'
import { Table } from 'reactstrap'

// <Header class="p-0" column="Users">Children</Header>

const TableComponent = (prop) => {
    return (
        <Table responsive size={prop.size && prop.size} borderless={prop.borderless && true} className={(prop.class) ? 'table '+prop.class : 'table'}>
            {prop.columns &&
            <thead>
                <tr>
                    {prop.columns.map(column => 
                        <th scope="col" width={prop.width && prop.width}>{column}</th>
                    )}
                </tr>
            </thead>
            }
            <tbody>
                {prop.children}
            </tbody>
        </Table>
    )
}

export default TableComponent
