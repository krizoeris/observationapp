import React from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import Table from '../components/Table'
import ActionButtonOption from '../components/ActionButtonOption'

const Grades = () => {
    const grades = [
        {name: 'Year 1'},
        {name: 'Year 2'},
    ]
    
    return (
        <div className="Grades container mt-4">
            <Header title="Grades">
                <button className="btn btn-success mt-2">Add New Grade</button>
            </Header>

            <Card class="shadow-sm border-0" classBody="p-0">
                <Table class="m-0" columns={['', 'Grade', '']}>
                    <tr class="bg-light">
                        <td width="20px"><input type="checkbox" class="checkTable table-top"/></td>
                        <td class=""><input type="text" class="form-control" placeholder="Filter grade" /></td>
                        <td width="20px"></td>
                    </tr>
                    {grades.map(grade => 
                        <tr>
                            <td class="pt-3"><input type="checkbox" class="checkTable" /></td>
                            <td class="pt-3">{grade.name}</td>
                            <td>
                                <ActionButtonOption>
                                    <a class="dropdown-item" href="#">Edit</a>
                                    <a class="dropdown-item" href="#">Delete</a>
                                    <a class="dropdown-item" href="#">Archive</a>
                                </ActionButtonOption>
                            </td>
                        </tr>
                    )}
                </Table>
            </Card>
        </div>
    )
}

export default Grades
