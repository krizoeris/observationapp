import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import Table from '../components/Table'
import Modal from '../components/Modal'
import ActionButtonOption from '../components/ActionButtonOption'
import SelectDropdown from '../components/SelectDropdown'

const firstLetterCaps = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Users = () => {

    const [state, setState] = useState({
        loading: false,
        paginate: [],
        users: [],
        filter: {
            fname: false,
            lname: false,
            type: false
        }
    })

    const getUsersData = async (page, limit, fname, lname, type) => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/users`

        if(page){ url = `${url}?page=${page}` }
        if(limit){ url = `${url}&limit=${limit}` }
        if(fname){ url = `${url}&fname=${fname}` }
        if(lname){ url = `${url}&lname=${lname}` }
        if(type){ url = `${url}&type=${type}` }


        let response = await fetch(url)
        response = await response.json()

        setState({
            ...state,
            paginate: response.paginate,
            users: response.data,
            loading: true
        })
    }

    const handleFilter = (e, name) => {
        let all = (e.value === "All" && name === "type") ? true : false
        setState({
            ...state,
            loading: false,
            filter: {
                ...state.filter,
                [name]: (e.value.length === 0 || all) ? false : e.value
            }
        })
    }

    let filter = state.filter

    useEffect(()=>{
        getUsersData(1, 10, filter.fname, filter.lname, filter.type)
        console.log(filter)
    }, [filter])
    
    return (
        <div className="Users container mt-4">
            <Header title="Users">
                <button className="btn btn-success mt-2">Add New User</button>
            </Header>

            <Card class="shadow-sm border-0" classBody="p-0">
                <Table class="m-0" columns={['', 'First Name', 'Last Name', 'User Type', '']}>
                    <tr class="bg-light">
                        <td width="20px"><input type="checkbox" class="checkTable table-top"/></td>
                        <td><input type="text" class="form-control" placeholder="Filter first name" onChange={(e) => { handleFilter(e.target, 'fname')}} /></td>
                        <td><input type="text" class="form-control" placeholder="Filter last name" onChange={(e) => { handleFilter(e.target, 'lname')}} /></td>
                        <td><SelectDropdown handleFilter={handleFilter} filterName={'type'} options={['All', 'Teacher', 'Observer', 'Facilitator', 'Admin']} /></td>
                        <td width="20px"></td>
                    </tr>
                    {state.loading && 
                        state.users.map(user => 
                        <tr>
                            <td class="pt-3"><input type="checkbox" class="checkTable" /></td>
                            <td class="pt-3">{user.first_name}</td>
                            <td class="pt-3">{user.last_name}</td>
                            <td class="pt-3">{firstLetterCaps(user.type)}</td>
                            <td>
                                <ActionButtonOption>
                                    <a class="dropdown-item" href="#">Edit</a>
                                    <a class="dropdown-item" href="#">Delete</a>
                                    <a class="dropdown-item" href="#">Archive</a>
                                </ActionButtonOption>
                            </td>
                        </tr>
                    )}
                    {!state.loading && <tr><td colSpan="5">Loading...</td></tr>}
                    {state.users.length === 0 && <tr><td colSpan="5">No records found</td></tr>}
                </Table>
            </Card>
        </div>
    )
}

export default Users
