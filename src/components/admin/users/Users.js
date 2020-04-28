// Dependencies
import React, { useState, useEffect } from 'react'
import { NotificationContainer } from 'react-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faPencilAlt, faTrash, faArchive } from '@fortawesome/free-solid-svg-icons'
import { 
    Card, CardBody, Container, Button,
    Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

// Shared
import Header from '../../../shared/components/Header'
import Table from '../../../shared/components/Table'
import Modal from '../../../shared/components/ModalAction'
import Pagination from '../../../shared/components/PaginationNav'
import { ReactComponent as LoadingAnimation} from '../../../shared/images/spinGray.svg'

// Local
import UserForm from './UserForm'

const firstLetterCaps = (string) => {return string.charAt(0).toUpperCase() + string.slice(1)}

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

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [modal, setModalOpen] = useState({
        open: false,
        title: '',
        action: '',
        id: 0
    })

    const toggleModal = (title = '', action = '', id = 0) => {
        setModalOpen({
            open: !modal.open,
            title: title,
            action: action,
            id: id
        })
    }
    const toggleDropdown = (id) => (dropdownOpen === id) ? setDropdownOpen(false) : setDropdownOpen(id) 

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
        <div className="Users">
            <Container className="mt-4 mb-4">
                <Header title="Users">
                    <Button color="success" className="ml-2 mt-2" onClick={() => toggleModal('Add New User', 'add')}>Add New User</Button>
                </Header>
                
                <Card className="shadow-sm border-0 mb-2">
                    <CardBody className="p-0">
                        <Table class="m-0" columns={['', 'First Name', 'Last Name', 'User Type', '']}>
                        <tr class="bg-light">
                            <td style={{minWidth: '30px'}}>
                                <Input type="checkbox" className="checkTable table-top"/>
                            </td>
                            <td width="35%">
                                <Input type="text" placeholder="Filter first name" onChange={(e) => { handleFilter(e.target, 'fname')}} />
                            </td>
                            <td width="35%">
                                <Input type="text" placeholder="Filter last name" onChange={(e) => { handleFilter(e.target, 'lname')}} />
                            </td>
                            <td width="30%">
                                <Input type="select" onChange={e => handleFilter(e.target, 'type')}>
                                    <option>All</option>
                                    <option>Teacher</option>
                                    <option>Observer</option>
                                    <option>Facilitator</option>
                                    <option>Admin</option>
                                </Input>
                            </td>
                            <td style={{minWidth: '115.5px'}}></td>
                        </tr>
                        {!state.loading && 
                            state.users.map(user => 
                            <tr>
                                <td class="pt-3"><Input type="checkbox" className="checkTable" /></td>
                                <td class="pt-3">{user.first_name}</td>
                                <td class="pt-3">{user.last_name}</td>
                                <td class="pt-3">{sliceAndCapsArr(user.type)}</td>
                                <td>
                                    <ButtonDropdown isOpen={dropdownOpen === user.id} toggle={() => toggleDropdown(user.id)}>
                                        <DropdownToggle className="btn-light btn-sm action" caret>
                                            <FontAwesomeIcon icon={faTasks} /> Action
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem onClick={() => {toggleModal('Edit User', 'edit', user.id)} }>
                                                <FontAwesomeIcon icon={faPencilAlt} /> Edit
                                            </DropdownItem>
                                            <DropdownItem>
                                                <FontAwesomeIcon icon={faTrash} /> Delete
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem>
                                                <FontAwesomeIcon icon={faArchive} /> Archive
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </td>
                            </tr>
                        )}
                        {state.loading && 
                            <tr>
                                <td height="300" colSpan="5"><center><LoadingAnimation style={{margin: '150 auto', height: 55, width: 55 }} /></center></td>
                            </tr>
                        }
                        {(state.users.length === 0 && !state.loading) && <tr><td colSpan="5">No records found</td></tr>}
                        </Table>
                    </CardBody>
                </Card>

                <Pagination handleFilter={handleFilter}  pagination={state.paginate} loading={state.loading}/>

                <Modal modal={modal.open} toggle={toggleModal} title={modal.title}>
                    <UserForm   action={modal.action} toggle={toggleModal} id={modal.id}
                                loadUser={() => getUsersData(filter.page, filter.limit, filter.fname, filter.lname, filter.type)} />
                </Modal>
            </Container>
            <NotificationContainer />
        </div>
    )
}

export default Users
