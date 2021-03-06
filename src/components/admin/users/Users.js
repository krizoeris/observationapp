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
import UserDelete from './UserDelete'

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
    // For checkbox
    const [deleteChecked, setDeleteChecked] = useState([])

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [modalDelete, setModalDelete] = useState({
        open: false,
        id: 0,
        fname: '',
        lname: ''
    })
    const [modal, setModalOpen] = useState({
        open: false,
        title: '',
        action: '',
        id: 0
    })

    const toggleDropdown = (id) => (dropdownOpen === id) ? setDropdownOpen(false) : setDropdownOpen(id) 
    const toggleModalDelete = (id = 0, fname = '', lname = '') => {
        setModalDelete({
            open: !modalDelete.open,
            id: id,
            fname: fname,
            lname: lname
        })
    }
    const toggleModal = (title = '', action = '', id = 0) => {
        setModalOpen({
            open: !modal.open,
            title: title,
            action: action,
            id: id
        })
    }

    const getUsersData = async (page, limit, fname, lname, type) => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/users`

        if(page){ url = `${url}?page=${page}` }
        if(limit){ url = `${url}&limit=${limit}` }
        if(fname){ url = `${url}&fname=${fname}` }
        if(lname){ url = `${url}&lname=${lname}` }
        if(type){ url = `${url}&type=${type}` }

        let response = await fetch(url, {
                            headers: {'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))}
                        })
        response = await response.json()

        if(response.success) {
            // For checkbox
            setDeleteChecked([])
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
    // For checkbox
    const handleDeleteChecked = (id) => {
        let idArr = deleteChecked
        if(idArr.includes(id)) {
            let idArrFiltered = idArr.filter(idA => idA !== id)
            setDeleteChecked(idArrFiltered)
        } else {
            idArr = [...idArr, id]
            setDeleteChecked(idArr)
        }
    }
    // For checkbox
    const handleCheckAll = () => {
        if(deleteChecked.length !== state.users.length) {
            setDeleteChecked(state.users.map(user => user.id))
        } else {
            setDeleteChecked([])
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
                    {/** For Checkbox **/}
                    {deleteChecked.length > 0 && 
                        <Button color="danger" className="ml-2 mt-2"
                                onClick={() => toggleModalDelete(deleteChecked, deleteChecked.length,'users')}>
                                    Delete ({deleteChecked.length})
                        </Button> 
                    }
                    <Button color="success" className="ml-2 mt-2" onClick={() => toggleModal('Add New User', 'add')}>Add New User</Button>
                </Header>
                
                <Card className="shadow-sm border-0 mb-2">
                    <CardBody className="p-0">
                        <Table className="m-0" columns={['', 'First Name', 'Last Name', 'User Type', '']}>
                        <tr className="bg-light">
                            <td style={{minWidth: '30px'}}>
                                {/** For Checkbox **/}
                                <Input type="checkbox" className="checkTable table-top" onChange={handleCheckAll} />
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
                                <td className="pt-3"><Input type="checkbox" className="checkTable" onChange={() => handleDeleteChecked(user.id)} checked={deleteChecked.includes(user.id)} /></td>
                                <td className="pt-3">{user.first_name}</td>
                                <td className="pt-3">{user.last_name}</td>
                                <td className="pt-3">{sliceAndCapsArr(user.type)}</td>
                                <td>
                                    <ButtonDropdown isOpen={dropdownOpen === user.id} toggle={() => toggleDropdown(user.id)}>
                                        <DropdownToggle className="btn-light btn-sm action" caret>
                                            <FontAwesomeIcon icon={faTasks} /> Action
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem onClick={() => {toggleModal('Edit User', 'edit', user.id)} }>
                                                <FontAwesomeIcon icon={faPencilAlt} /> Edit
                                            </DropdownItem>
                                            <DropdownItem onClick={() => {toggleModalDelete(user.id, user.first_name, user.last_name)} }>
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

                <Modal modal={modalDelete.open} toggle={toggleModalDelete} title={'Delete User'}>
                    <UserDelete toggle={toggleModalDelete} fname={modalDelete.fname} lname={modalDelete.lname} id={modalDelete.id}
                                loadUser={() => getUsersData(filter.page, filter.limit, filter.fname, filter.lname, filter.type)} />
                </Modal>

            </Container>
            <NotificationContainer />
        </div>
    )
}

export default Users
