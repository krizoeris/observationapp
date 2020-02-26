import React, { Component } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import Table from '../components/Table'
import ActionButtonOption from '../components/ActionButtonOption'

const Subjects = () => {
    const subjects = [
        {name: 'Maths', observer: 2, facilitator: 1, teacher: 15}
    ]
    return (
        <div className="Subjects container mt-4">
            <Header title="Subjects">
                <button className="btn btn-success mt-2">Add New Subject</button>
            </Header>

            <Card class="shadow-sm border-0" classBody="p-0">
                <Table class="m-0" columns={['', 'Subject', '', '', '', '']}>
                    <tr class="bg-light">
                        <td width="20px"><input type="checkbox" class="checkTable table-top"/></td>
                        <td colspan="4" class=""><input type="text" class="form-control" placeholder="Filter subject" /></td>
                        <td width="20px"></td>
                    </tr>
                    {subjects.map(subject => 
                        <tr>
                            <td class="pt-3"><input type="checkbox" class="checkTable" /></td>
                            <td class="pt-3">{subject.name}</td>
                            <td class="pt-3"><strong>{subject.observer}</strong> Observer</td>
                            <td class="pt-3"><strong>{subject.facilitator}</strong> Facilitator</td>
                            <td class="pt-3"><strong>{subject.teacher}</strong> Teacher</td>
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

export default Subjects
