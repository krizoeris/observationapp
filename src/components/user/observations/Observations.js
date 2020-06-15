// Dependecies
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Badge, Container, Input, Button } from 'reactstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faUser, faFileSignature } from '@fortawesome/free-solid-svg-icons'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

// Shared
import Table from '../../../shared/components/Table'
import Modal from '../../../shared/components/ModalAction'

// Local 
import AppContext from '../../../AppContext';
import StartObservation from './StartObservation'

const Observations = () => {
    // Global State
    const [globalState, setGlobalState] = useContext(AppContext);
    
    // Local State
    const [subjectTeachersState, setSubjectTeachersState] = useState([])
    const [observeModal, setObserverModal] = useState(false)

    const toggleObserverModal = () => setObserverModal(!observeModal)

    const getSubjectTeachers = async () => {
        let id = globalState.user.id
        let url = `${process.env.REACT_APP_BACKEND_URL}/users/${id}`
        let response = await fetch(url, {
            headers: {'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))}
        })
        response = await response.json()
        response = response.data

        let subjectsId = response.subjects.map(s => s.id)
        let subjects = []

        await Promise.all(
            subjectsId.map(async s => {
                let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/subjects/${s}`, {
                    headers: {'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))}
                })
                response = await response.json()
                response = response.data

                subjects.push({
                    id: response.id,
                    name: response.name,
                    users: response.users.filter(u => u.subject_users.user_type.includes('teacher'))
                })
            })
        )
        setSubjectTeachersState(subjects)
    }

    useEffect(() => {
        getSubjectTeachers()
    }, [])

    return (
        <div style={{minHeight: '100%', width: '100%', position: 'relative'}}>
            <div className="p-3" style={{width: '300px', minHeight: '100%', position: 'absolute', backgroundColor: '#fff', borderRight: '1px solid #e6e6e6'}}>
                <Input type="text" placeholder="Search" className="mb-2" />
                {subjectTeachersState && subjectTeachersState.map(subject =>
                    <Table borderless size='sm' columns={[subject.name]}>
                        {subject.users.map(users => 
                            <tr>
                                <td className="d-flex">
                                    <Link className="btn text-left bg-light-2 action border-0 mr-2 w-100" to={`/observations/${users.id}`}>
                                        <FontAwesomeIcon icon={faUser} /> {`${users.first_name} ${users.last_name}`}
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </Table>
                )}
            </div>

            <div style={{width: 'calc(100% - 300px)', height: '100%', marginLeft: '300px'}}>
                <div className="bg-white p-2 d-flex">
                    <Button color="success" onClick={toggleObserverModal}><FontAwesomeIcon icon={faFileSignature} /> Start Observation</Button>
                </div>  
                <Container>
                    <Table className="m-0" columns={['Teacher', 'Observer', 'Form', 'Date', 'Status', '']}>
                        <tr >
                            <td>John Smith</td>
                            <td>Juan Dela Cruz</td>
                            <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                            <td>Jan. 20, 2020</td>
                            <td><Badge color="success">Finished</Badge></td>
                            <td style={{minWidth: '120px'}}>
                                <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                    <FontAwesomeIcon icon={faFolderOpen} /> Open
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>John Smith</td>
                            <td>Juan Dela Cruz</td>
                            <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                            <td>Jan. 20, 2020</td>
                            <td><Badge color="success">Finished</Badge></td>
                            <td>
                                <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                    <FontAwesomeIcon icon={faFolderOpen} /> Open
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>John Smith</td>
                            <td>Juan Dela Cruz</td>
                            <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                            <td>Jan. 20, 2020</td>
                            <td><Badge color="success">Finished</Badge></td>
                            <td>
                                <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                    <FontAwesomeIcon icon={faFolderOpen} /> Open
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>John Smith</td>
                            <td>Juan Dela Cruz</td>
                            <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                            <td>Jan. 20, 2020</td>
                            <td><Badge color="success">Finished</Badge></td>
                            <td>
                                <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                    <FontAwesomeIcon icon={faFolderOpen} /> Open
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>John Smith</td>
                            <td>Juan Dela Cruz</td>
                            <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                            <td>Jan. 20, 2020</td>
                            <td><Badge color="success">Finished</Badge></td>
                            <td>
                                <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                    <FontAwesomeIcon icon={faFolderOpen} /> Open
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>John Smith</td>
                            <td>Juan Dela Cruz</td>
                            <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                            <td>Jan. 20, 2020</td>
                            <td><Badge color="success">Finished</Badge></td>
                            <td style={{minWidth: '120px'}}>
                                <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                    <FontAwesomeIcon icon={faFolderOpen} /> Open
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>John Smith</td>
                            <td>Juan Dela Cruz</td>
                            <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                            <td>Jan. 20, 2020</td>
                            <td><Badge color="success">Finished</Badge></td>
                            <td>
                                <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                    <FontAwesomeIcon icon={faFolderOpen} /> Open
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>John Smith</td>
                            <td>Juan Dela Cruz</td>
                            <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                            <td>Jan. 20, 2020</td>
                            <td><Badge color="success">Finished</Badge></td>
                            <td>
                                <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                    <FontAwesomeIcon icon={faFolderOpen} /> Open
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>John Smith</td>
                            <td>Juan Dela Cruz</td>
                            <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                            <td>Jan. 20, 2020</td>
                            <td><Badge color="success">Finished</Badge></td>
                            <td>
                                <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                    <FontAwesomeIcon icon={faFolderOpen} /> Open
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>John Smith</td>
                            <td>Juan Dela Cruz</td>
                            <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                            <td>Jan. 20, 2020</td>
                            <td><Badge color="success">Finished</Badge></td>
                            <td>
                                <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                    <FontAwesomeIcon icon={faFolderOpen} /> Open
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>John Smith</td>
                            <td>Juan Dela Cruz</td>
                            <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                            <td>Jan. 20, 2020</td>
                            <td><Badge color="success">Finished</Badge></td>
                            <td style={{minWidth: '120px'}}>
                                <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                    <FontAwesomeIcon icon={faFolderOpen} /> Open
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>John Smith</td>
                            <td>Juan Dela Cruz</td>
                            <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                            <td>Jan. 20, 2020</td>
                            <td><Badge color="success">Finished</Badge></td>
                            <td>
                                <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                    <FontAwesomeIcon icon={faFolderOpen} /> Open
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>John Smith</td>
                            <td>Juan Dela Cruz</td>
                            <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                            <td>Jan. 20, 2020</td>
                            <td><Badge color="success">Finished</Badge></td>
                            <td>
                                <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                    <FontAwesomeIcon icon={faFolderOpen} /> Open
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>John Smith</td>
                            <td>Juan Dela Cruz</td>
                            <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                            <td>Jan. 20, 2020</td>
                            <td><Badge color="success">Finished</Badge></td>
                            <td>
                                <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                    <FontAwesomeIcon icon={faFolderOpen} /> Open
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>John Smith</td>
                            <td>Juan Dela Cruz</td>
                            <td>Evidence Gathering: Lesson Observation Rubric 2 19-20</td>
                            <td>Jan. 20, 2020</td>
                            <td><Badge color="success">Finished</Badge></td>
                            <td>
                                <Link className="btn-sm bg-main text-light action border-0 mr-2" to={`/observations/sample`}>
                                    <FontAwesomeIcon icon={faFolderOpen} /> Open
                                </Link>
                            </td>
                        </tr>
                    </Table>
                    <Modal modal={observeModal} toggle={toggleObserverModal} title={'Observation'}>
                        <StartObservation subjectTeacher={subjectTeachersState} />
                    </Modal>
                </Container>
            </div>
        </div>
    )
}

export default Observations
