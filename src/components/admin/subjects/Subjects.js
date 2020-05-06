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
import SubjectsForm from './SubjectForm'
import SubjectsDelete from './SubjectDelete'

const Subjects = () => {
    const [state, setState] = useState({
        loading: true,
        paginate: [],
        subjects: [],
        filter: {
            name: false,
            page: 1,
            limit: 10
        }
    })

    const [dropdownOpen, setOpen] = useState(false)
    const [modalDelete, setModalDelete] = useState({
        open: false,
        id: 0,
        name: '',
    })
    const [modal, setModalOpen] = useState({
        open: false,
        title: '',
        action: '',
        id: 0
    })

    const toggle = (id) => (dropdownOpen === id) ? setOpen(false) : setOpen(id) 
    const toggleModalDelete = (id = 0, name = '') => {
        setModalDelete({
            open: !modalDelete.open,
            id: id,
            name: name,
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

    const getSubjectsData = async (page, limit, name) => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/subjects`

        if(page){ url = `${url}?page=${page}` }
        if(limit){ url = `${url}&limit=${limit}` }
        if(name){ url = `${url}&name=${name}` }

        let response = await fetch(url)
        response = await response.json()

        if(response.success) {
            setState({
                ...state,
                paginate: response.paginate,
                subjects: response.data,
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
        if(name !== 'page') {
            setState({
                ...state,
                filter: {
                    ...state.filter,
                    page: 1,
                    [name]: (e.value.length === 0) ? false : e.value
                }
            })
        } else {
            setState({
                ...state,
                filter: {
                    ...state.filter,
                    [name]: (e.value.length === 0) ? false : e.value
                }
            })
        }
    }

    let filter = state.filter

    useEffect(()=>{
        setState({...state, loading: true})
        const handler = setTimeout(() => {
            getSubjectsData(filter.page, filter.limit, filter.name)
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
        <div className="Subjects">
            <Container className="mt-4">
                <Header title="Subjects">
                <Button color="success" className="ml-2 mt-2" onClick={() => toggleModal('Add New Subject', 'add')}>Add New Subject</Button>
                </Header>

                <Card className="shadow-sm border-0 mb-2">
                    <CardBody className="p-0">
                        <Table className="m-0" columns={['', 'Subject', '', '', '', '']}>
                        <tr className="bg-light">
                            <td style={{minWidth: '42px'}}>
                                <Input type="checkbox" className="checkTable table-top"/>
                            </td>
                            <td colspan="4" width="100%">
                                <Input type="text" placeholder="Filter Subject" onChange={(e) => { handleFilter(e.target, 'name')}} />
                            </td>
                            <td style={{minWidth: '115.5px'}}></td>
                        </tr>
                        {!state.loading &&
                            state.subjects.map(subject => 
                            <tr>
                                <td className="pt-3"><input type="checkbox" className="checkTable" /></td>
                                <td className="pt-3">{subject.name}</td>
                                <td className="pt-3"><strong>{subject.observer}</strong> Observer</td>
                                <td className="pt-3"><strong>{subject.teachers}</strong> Teacher</td>
                                <td className="pt-3"><strong>{subject.facilitator}</strong> Facilitator</td>
                                <td>
                                    <ButtonDropdown isOpen={dropdownOpen === subject.id} toggle={() => toggle(subject.id)}>
                                        <DropdownToggle className="btn-light btn-sm action" caret>
                                            <FontAwesomeIcon icon={faTasks} /> Action
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem onClick={() => {toggleModal('Edit Subject', 'edit', subject.id)} }><FontAwesomeIcon icon={faPencilAlt} /> Edit</DropdownItem>
                                            <DropdownItem onClick={() => {toggleModalDelete(subject.id, subject.name)} }><FontAwesomeIcon icon={faTrash} /> Delete</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem><FontAwesomeIcon icon={faArchive} /> Archive</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </td>
                            </tr>
                        )}{state.loading && 
                            <tr>
                                <td height="300" colSpan="6"><center><LoadingAnimation style={{margin: '150 auto', height: 55, width: 55 }} /></center></td>
                            </tr>
                        }
                        {(state.subjects.length === 0 && !state.loading) && <tr><td colSpan="5">No records found</td></tr>}
                        </Table>
                    </CardBody>
                </Card>

                <Pagination handleFilter={handleFilter}  pagination={state.paginate} loading={state.loading}/>
            
                <Modal modal={modal.open} toggle={toggleModal} title={modal.title}>
                    <SubjectsForm   action={modal.action} toggle={toggleModal} id={modal.id}
                                loadSubjects={() => getSubjectsData(filter.page, filter.limit, filter.name)} />
                </Modal>

                <Modal modal={modalDelete.open} toggle={toggleModalDelete} title={'Delete Subject'}>
                    <SubjectsDelete toggle={toggleModalDelete} name={modalDelete.name} id={modalDelete.id}
                                loadSubjects={() => getSubjectsData(filter.page, filter.limit, filter.name)} />
                </Modal>
            </Container>
            <NotificationContainer />
        </div>
    )
}

export default Subjects
