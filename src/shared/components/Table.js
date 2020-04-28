import React from 'react'

// <Header class="p-0" column="Users">Children</Header>

const Table = (prop) => {
    return (
        <table className={(prop.class) ? 'table '+prop.class : 'table'}>
            {prop.columns &&
            <thead>
                <tr>
                    {prop.columns.map(column => 
                        <th scope="col">{column}</th>
                    )}
                </tr>
            </thead>
            }
            <tbody>
                {prop.children}
            </tbody>
        </table>
    )
}

export default Table
