// Dependencies
import React, { useState, useEffect } from 'react'

// Shared
import Header from '../../../shared/components/Header'
import Card from '../../../shared/components/Card'
import Table from '../../../shared/components/Table'
import Modal from '../../../shared/components/Modal'
import Pagination from '../../../shared/components/Pagination'
import ActionButtonOption from '../../../shared/components/ActionButtonOption'
import SelectDropdown from '../../../shared/components/SelectDropdown'
import { ReactComponent as LoadingAnimation} from '../../../shared/images/loading.svg'

// Local
import UserCreate from './UserCreate'
import UserEdit from './UserEdit'

const firstLetterCaps = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const sliceAndCapsArr = (array) => {
    let string
    array.map(arr => string = (string) ? string+', '+firstLetterCaps(arr) : firstLetterCaps(arr))
    return string
}

const Users = () => {

    const [state, setState] = useState({
        loading: true,
        paginate: [],
        users: [],
        filter: {
            fname: false,
            lname: false,
            type: false,
            page: 1,
            limit: 10
        }
    })

    const [opState, setOpState] = useState({
        edit: [],
        delete: []
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

        if(response.success) {
            setState({
                ...state,
                paginate: response.paginate,
                users: response.data,
                loading: false,
            })
        } else {
            setState({
                ...state,
                loading: false
            })
        }
    }

    const handleEdit = (user) => {
        setOpState({
            ...opState,
            edit: user
        })
    }

    const handleFilter = (e, name) => {
        let all = (e.value === "All" && name === "type") ? true : false
        if(name !== 'page') {
            setState({
                ...state,
                filter: {
                    ...state.filter,
                    page: 1,
                    [name]: (e.value.length === 0 || all) ? false : e.value
                }
            })
        } else {
            setState({
                ...state,
                filter: {
                    ...state.filter,
                    [name]: (e.value.length === 0 || all) ? false : e.value
                }
            })
        }
    }

    let filter = state.filter

    useEffect(()=>{
        setState({...state, loading: true})
        const handler = setTimeout(() => {
            getUsersData(filter.page, filter.limit, filter.fname, filter.lname, filter.type)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [filter])

    useEffect(()=>{
        setState({
            ...state, 
            filter: {
                ...state.filter,
                page: 1
            }
        })
    }, [filter.limit])
    
    return (
        <div className="Users container mt-4 mb-4">
            <Header title="Users">
                <div class="btn-group btn-group-toggle mt-2" data-toggle="buttons">
                    <label class="btn bg-main">
                        <input type="radio" name="options" id="option1" /> Import
                    </label>
                    <label class="btn bg-main">
                        <input type="radio" name="options" id="option2" /> Export
                    </label>
                </div>

                <button className="btn btn-success ml-2 mt-2" data-toggle="modal" data-target="#addUser">Add New User</button>
            </Header>

            <Pagination handleFilter={handleFilter}  pagination={state.paginate} loading={state.loading}/>
            
            <Card class="shadow-sm border-0 mb-2" classBody="p-0">
                <Table class="table-sm m-0" columns={['', 'First Name', 'Last Name', 'User Type', '']}>
                    <tr class="bg-light">
                        <td><input type="checkbox" class="checkTable table-top"/></td>
                        <td width="35%"><input type="text" class="form-control" placeholder="Filter first name" onChange={(e) => { handleFilter(e.target, 'fname')}} /></td>
                        <td width="35%"><input type="text" class="form-control" placeholder="Filter last name" onChange={(e) => { handleFilter(e.target, 'lname')}} /></td>
                        <td width="30%"><SelectDropdown handleFilter={handleFilter} filterName={'type'} options={['All', 'Teacher', 'Observer', 'Facilitator', 'Admin']} /></td>
                        <td style={{minWidth: '64px'}}></td>
                    </tr>
                    {!state.loading && 
                        state.users.map(user => 
                        <tr>
                            <td class="pt-3"><input type="checkbox" class="checkTable" /></td>
                            <td class="pt-3">{user.first_name}</td>
                            <td class="pt-3">{user.last_name}</td>
                            <td class="pt-3">{sliceAndCapsArr(user.type)}</td>
                            <td>
                                <ActionButtonOption>
                                    <button class="dropdown-item" data-toggle="modal" data-target="#editUser" onClick={() => handleEdit(user)}>Edit</button>
                                    <a class="dropdown-item" href="#">Delete</a>
                                    <a class="dropdown-item" href="#">Archive</a>
                                </ActionButtonOption>
                            </td>
                        </tr>
                    )}
                    {state.loading && 
                        <tr>
                            <td colSpan="5"><center><LoadingAnimation style={{margin: '0 auto', height: 55, width: 55 }} /></center></td>
                        </tr>
                    }
                    {(state.users.length === 0 && !state.loading) && <tr><td colSpan="5">No records found</td></tr>}
                </Table>
            </Card>

            <Modal target="addUser" title="Add User">
                <UserCreate loadUser={() => getUsersData(filter.page, filter.limit, filter.fname, filter.lname, filter.type)} />
            </Modal>

            <Modal target="editUser" title="Edit User">
                {opState.edit.length !== 0 && <UserEdit user={opState.edit} loadUser={() => getUsersData(filter.page, filter.limit, filter.fname, filter.lname, filter.type)} /> }
            </Modal>
        </div>
    )
}

export default Users