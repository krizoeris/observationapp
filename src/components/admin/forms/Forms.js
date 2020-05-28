// Dependencies
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { NotificationContainer } from 'react-notifications';
import {    
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    TabContent, TabPane, Nav, NavItem, NavLink, Container,
    Button, Row, Col, Input
} from 'reactstrap';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faPencilAlt, faTrash, faArchive, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

// Shared
import Header from '../../../shared/components/Header'
import Table from '../../../shared/components/Table'
import Modal from '../../../shared/components/ModalAction'
import Pagination from '../../../shared/components/PaginationNav'
import { ReactComponent as LoadingAnimation} from '../../../shared/images/spinGray.svg'

// Local
import FormsForm from './FormsForm'
import FormsDelete from './FormsDelete'
import Ratings from './Ratings'

const Forms = () => {
    const [activeTab, setActiveTab] = useState('1');
    const [state, setState] = useState({
        loading: true,
        paginate: [],
        forms: [],
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
        title: '',
    })
    const [modal, setModalOpen] = useState({
        open: false,
        title: '',
        action: '',
        id: 0
    })

    const toggle = (id) => (dropdownOpen === id) ? setOpen(false) : setOpen(id) 
    const toggleModalDelete = (id = 0, title = '') => {
        setModalDelete({
            open: !modalDelete.open,
            id: id,
            title: title,
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
    const toggleTab = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const getFormsData = async (page, limit, title) => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/forms`

        if(page){ url = `${url}?page=${page}` }
        if(limit){ url = `${url}&limit=${limit}` }
        if(title){ url = `${url}&title=${title}` }

        let response = await fetch(url, {
            headers: {'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))}
        })
        response = await response.json()

        if(response.success) {
            setState({
                ...state,
                paginate: response.paginate,
                forms: response.data,
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
            getFormsData(filter.page, filter.limit, filter.title)
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
        <div className="Forms">
            <Container className="mt-4">
                <Header title="Forms">
                    <Button color="success" className="ml-2 mt-2" onClick={() => toggleModal('Create New Form', 'add')}>Create New Form</Button>
                </Header>

                <Nav tabs>
                    <NavItem>
                        <NavLink className={`text-dark ${classnames({ active: activeTab === '1' })}`} onClick={() => { toggleTab('1'); }} href="#" >
                            Forms
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={`text-dark ${classnames({ active: activeTab === '2' })}`} onClick={() => { toggleTab('2'); }} href="#" >
                            Ratings
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={activeTab} className="border bg-white mb-2">
                    <TabPane tabId="1">
                        <Table class="m-0">
                            <tr class="bg-light">
                                <td colspan="2" width="100%">
                                    <Input type="text" placeholder="Filter Form" onChange={(e) => { handleFilter(e.target, 'title')}} />
                                </td>
                            </tr>
                            {!state.loading &&
                                state.forms.map(form => 
                                <tr>
                                    <td class="pt-3 pl-4">{form.title}</td>
                                    <td  style={{width: '120px'}}>
                                        <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/admin/forms/${form.id}`}><FontAwesomeIcon icon={faFolderOpen} /> Open</Link>
                                        <ButtonDropdown isOpen={dropdownOpen === form.id} toggle={() => toggle(form.id)}>
                                            <DropdownToggle className="btn-light btn-sm action" caret>
                                                <FontAwesomeIcon icon={faTasks} /> Action
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem onClick={() => {toggleModal('Edit Form', 'edit', form.id)} }><FontAwesomeIcon icon={faPencilAlt} /> Edit</DropdownItem>
                                                <DropdownItem onClick={() => {toggleModalDelete(form.id, form.title)} }><FontAwesomeIcon icon={faTrash} /> Delete</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem><FontAwesomeIcon icon={faArchive} /> Archive</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </td>
                                </tr>
                            )}{state.loading && 
                                <tr>
                                    <td height="300" colSpan="2"><center><LoadingAnimation style={{margin: '150 auto', height: 55, width: 55 }} /></center></td>
                                </tr>
                            }
                            {(state.forms.length === 0 && !state.loading) && <tr><td colSpan="5">No records found</td></tr>}
                        </Table>
                    </TabPane>
                    <TabPane tabId="2">
                    <Row>
                        <Col className="m-4" md="6">
                            <Ratings />
                        </Col>
                    </Row>
                    </TabPane>
                </TabContent>
                {activeTab === '1' && <Pagination handleFilter={handleFilter}  pagination={state.paginate} loading={state.loading}/>}

                <Modal modal={modal.open} toggle={toggleModal} title={modal.title}>
                    <FormsForm   action={modal.action} toggle={toggleModal} id={modal.id}
                                loadForms={() => getFormsData(filter.page, filter.limit, filter.title)} />
                </Modal>

                <Modal modal={modalDelete.open} toggle={toggleModalDelete} title={'Delete Form'}>
                    <FormsDelete toggle={toggleModalDelete} title={modalDelete.title} id={modalDelete.id}
                                loadForms={() => getFormsData(filter.page, filter.limit, filter.title)} />
                </Modal>
            </Container>
            <NotificationContainer />
        </div>
    )
}

export default Forms
