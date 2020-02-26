import React from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import Table from '../components/Table'
import ActionButtonOption from '../components/ActionButtonOption'
import SelectDropdown from '../components/SelectDropdown'

const Users = () => {
    const users = [
        {firstName: 'Kriztian', lastName: 'Eris', email: 'kriztian.eris@gmail.com', type: 'Admin' },
        {firstName: 'Kriztian', lastName: 'Eris', email: 'kriztian.eris@gmail.com', type: 'Admin' },
        {firstName: 'Kriztian', lastName: 'Eris', email: 'kriztian.eris@gmail.com', type: 'Admin' }
    ]

    return (
        <div className="Users container mt-4">
            <Header title="Users">
                <button className="btn btn-success mt-2">Add New User</button>
            </Header>

            <Card class="shadow-sm border-0" classBody="p-0">
                <Table class="m-0" columns={['', 'First Name', 'Last Name', 'User Type', '']}>
                    <tr class="bg-light">
                        <td width="20px"><input type="checkbox" class="checkTable table-top"/></td>
                        <td><input type="text" class="form-control" placeholder="Filter first name" /></td>
                        <td><input type="text" class="form-control" placeholder="Filter last name" /></td>
                        <td><SelectDropdown options={['All', 'Teacher', 'Observer', 'Facilitator', 'Admin']} /></td>
                        <td width="20px"></td>
                    </tr>
                    {users.map(user => 
                        <tr>
                            <td class="pt-3"><input type="checkbox" class="checkTable" /></td>
                            <td class="pt-3">{user.firstName}</td>
                            <td class="pt-3">{user.lastName}</td>
                            <td class="pt-3">{user.type}</td>
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

export default Users
